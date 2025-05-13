import React, { createContext, useContext, useState, useEffect } from "react"; // Added useEffect potentially for router
import { useRouter } from "next/router"; // Import useRouter

const FormContext = createContext();

// Provider Component
export const FormProvider = ({ children }) => {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState({
    movingAndSetupCost: "",
    monthlyLivingCost: "",
    rent: "",
    securityDeposit: "",
    totalMonthlyIncome: "",
    totalSavings: "",
    monthsToEvaluate: "",
    rentEstimates: null, // Restored
    location: "",
  });

  const [formErrors, setFormErrors] = useState({
    movingAndSetupCostError: "",
    monthlyLivingCostError: "",
    rentError: "",
    securityDepositError: "",
    totalMonthlyIncomeError: "",
    totalSavingsError: "",
    monthsToEvaluateError: "",
  });
  const [formError, setFormError] = useState(""); // Global form error state
  const [results, setResults] = useState(null); // State to store calculation results
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // const [showResults, setShowResults] = useState(false); // No longer needed for modal
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  // Field name to label mapping
  const fieldLabels = {
    movingAndSetupCost: "Moving & Setup Costs",
    monthlyLivingCost: "Monthly Expenses",
    rent: "Monthly Rent",
    securityDeposit: "Security Deposit",
    totalMonthlyIncome: "Total Monthly Income",
    totalSavings: "Total Savings",
    monthsToEvaluate: "Months to Evaluate",
  };

  // handle feedback submissions
  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  const handleFeedbackSubmit = async (feedback) => {
    setFeedbackMessage("");
    setFeedbackError("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowFeedbackForm(false); // Optionally close the form on successful submission
        setFeedbackMessage("Thank you for your feedback!");
      } else {
        setFeedbackError(data.error || "Failed to submit feedback");
      }
    } catch (error) {
      setFeedbackError("Failed to submit feedback. Please try again later.");
    }
  };

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    // Reset ALL errors on any input change to prevent stale cross-field validation issues during typing
    setFormErrors({
      movingAndSetupCostError: "",
      monthlyLivingCostError: "",
      rentError: "",
      securityDepositError: "",
      totalMonthlyIncomeError: "",
      totalSavingsError: "",
      monthsToEvaluateError: "",
      locationError: "",
    });

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Now validate the new value
    validateField(fieldName, value);

    // If location changes and has length, fetch rent estimates (Restored)
    if (fieldName === "location" && value.length > 3) {
      fetchRentEstimates(value);
    }
  };

  const fetchRentEstimates = async (location) => {
    // Attempt to extract ZIP code from location string
    const zipMatch = location.match(/\b\d{5}\b/);
    const zipCode = zipMatch ? zipMatch[0] : null;

    if (!zipCode) {
      // Optionally clear previous estimate or show message if no ZIP found
      setFormData((prev) => ({ ...prev, rentEstimates: null }));
      // Optionally set an error message in formErrors if desired
      // setFormErrors((prev) => ({ ...prev, locationError: "Please include a 5-digit ZIP code in the location." }));
      return; // Exit if no ZIP code found
    }

    try {
      const response = await fetch("/api/ai/rent-estimates", {
        method: "POST", // The API route itself expects POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode }), // Send zipCode
      });

      if (!response.ok) {
        let errorDetails = "";
        let errorData = null;
        try {
          errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (jsonErr) {
          try {
            errorDetails = await response.text();
          } catch (textErr) {
            errorDetails = "Unable to parse error response";
          }
        }
        console.error(
          `[fetchRentEstimates] Failed to fetch market rent estimate for zipCode=${zipCode}. Status: ${response.status}. Details: ${errorDetails}`
        );
        throw new Error(
          (errorData && errorData.error) ||
            "Failed to fetch market rent estimate"
        );
      }

      const estimate = await response.json();

      if (!estimate || !estimate.averageRent) {
        console.error(
          `[fetchRentEstimates] No averageRent returned for zipCode=${zipCode}. Full response: ${JSON.stringify(
            estimate
          )}`
        );
      }

      // Store the market average rent estimate
      setFormData((prev) => ({
        ...prev,
        rentEstimates: {
          averageRent: estimate.averageRent,
          source: estimate.source,
          zipCode: estimate.zipCode,
          lastUpdated: new Date().toISOString(),
        },
        // Do not automatically update the user's rent input
      }));
      // Clear any previous location/rent errors related to fetching
      setFormErrors((prev) => ({ ...prev, locationError: "", rentError: "" }));
    } catch (error) {
      console.error(
        `[fetchRentEstimates] Exception for zipCode=${zipCode}:`,
        error
      );
      setFormData((prev) => ({
        ...prev,
        rentEstimates: null, // Clear estimate on error
      }));
      // Set an error message specific to market rent fetching
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        // Or a general form error
        locationError:
          "Unable to fetch market rent estimate for this ZIP code.",
      }));
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    const fieldLabel = fieldLabels[fieldName];

    // Required check for all fields except rentEstimates (Restored)
    if (
      fieldName !== "rentEstimates" &&
      (value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "string" && value.trim() === ""))
    ) {
      errorMessage = `${fieldLabel} is required.`;
    }

    // Numeric fields validation
    const numericFields = [
      "movingAndSetupCost",
      "monthlyLivingCost",
      "rent",
      "securityDeposit",
      "totalMonthlyIncome",
      "totalSavings",
      "monthsToEvaluate",
    ];
    if (!errorMessage && numericFields.includes(fieldName)) {
      const num = Number(value);
      if (isNaN(num) || num < 0) {
        errorMessage = `Please enter a valid positive number for ${fieldLabel}.`;
      }
      // Field-specific range checks
      if (
        !errorMessage &&
        fieldName === "monthsToEvaluate" &&
        (num < 1 || num > 60)
      ) {
        errorMessage = `Please enter a valid range between 1 and 60 for ${fieldLabel}.`;
      }
      // Rent vs Income check removed from here - will be done in handleSubmit
      if (
        !errorMessage &&
        fieldName === "securityDeposit" &&
        num > 12 * Number(formData.rent || 0)
      ) {
        errorMessage = `Security Deposit should not exceed 12 months of rent.`;
      }
    }

    // Location validation
    if (!errorMessage && fieldName === "location") {
      // Allow city or ZIP, adjust validation if needed
      if (typeof value !== "string" || value.trim().length < 2) {
        errorMessage =
          "Please enter a valid City or ZIP code (at least 2 characters).";
      }
    }

    // Update the error state for the current field
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      // Explicitly clear the current field's error before setting a new one
      updatedErrors[`${fieldName}Error`] = "";

      // If validating the rent field, ensure its error is cleared first
      if (fieldName === "rent") {
        updatedErrors.rentError = "";
      }

      // Set the new error message if one exists
      if (errorMessage) {
        updatedErrors[`${fieldName}Error`] = errorMessage;
      }

      // Logic to clear rentError when income is validated removed,
      // as resetting all errors in handleSubmit is more robust.

      return updatedErrors;
    });
    return errorMessage === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); // Reset global form error message

    // Reset individual field errors before re-validating
    setFormErrors({
      movingAndSetupCostError: "",
      monthlyLivingCostError: "",
      rentError: "",
      securityDepositError: "",
      totalMonthlyIncomeError: "",
      totalSavingsError: "",
      monthsToEvaluateError: "",
      locationError: "", // Ensure locationError is also reset
    });

    // Validate all fields before submission
    const isFormValid = Object.keys(formData).every((key) => {
      // Skip validation for rentEstimates
      if (key === "rentEstimates") return true;
      const isValid = validateField(key, formData[key]);
      return isValid; // Update validation state
    });

    if (isFormValid) {
      // Add specific cross-field validation here after individual fields are valid
      const rentNum = Number(formData.rent);
      const incomeNum = Number(formData.totalMonthlyIncome);
      if (!isNaN(rentNum) && !isNaN(incomeNum) && rentNum > incomeNum) {
        setFormErrors((prev) => ({
          ...prev,
          rentError: "Monthly Rent should not exceed Total Monthly Income.",
        }));
        setFormError("Please correct the errors in the form.");
        return; // Stop submission if this specific validation fails
      }

      // Proceed with form submission
      try {
        const response = await fetch("/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          // If serverless validation fails, show errors
          if (data.errors) {
            Object.entries(data.errors).forEach(([field, msg]) => {
              setFormErrors((prev) => ({
                ...prev,
                [`${field}Error`]: msg,
              }));
            });
            setFormError("Please correct the errors in the form.");
            return;
          }
          setFormError("Failed to submit form. Please try again later.");
          return;
        }
        // Perform client-side calculations after successful validation
        const movingCost = Number(formData.movingAndSetupCost) || 0;
        const livingCost = Number(formData.monthlyLivingCost) || 0;
        const rentCost = Number(formData.rent) || 0;
        const depositCost = Number(formData.securityDeposit) || 0;
        const income = Number(formData.totalMonthlyIncome) || 0;
        const savings = Number(formData.totalSavings) || 0;
        const months = Number(formData.monthsToEvaluate) || 1; // Default to 1 if invalid

        const initialCosts = movingCost + depositCost;
        const totalMonthlyCosts = livingCost + rentCost;
        const totalCostOverTime = initialCosts + totalMonthlyCosts * months;
        const monthlyNetIncome = income - totalMonthlyCosts;

        const canAffordInitial = savings >= initialCosts;
        const canAffordMonthly = monthlyNetIncome >= 0;
        const canAfford = canAffordInitial && canAffordMonthly;
        const additionalMonthlyIncomeNeeded = canAffordMonthly
          ? 0
          : Math.abs(monthlyNetIncome);

        // TODO: Implement affordabilityDuration calculation if needed

        // Update results state with calculated values
        setResults({
          success: true, // Keep success flag from API
          initialCosts: initialCosts.toFixed(2),
          totalMonthlyCosts: totalMonthlyCosts.toFixed(2),
          totalCostOverTime: totalCostOverTime.toFixed(2),
          canAfford: canAfford,
          additionalMonthlyIncomeNeeded:
            additionalMonthlyIncomeNeeded.toFixed(2),
          // affordabilityDuration: calculatedDuration, // Add when implemented
        });
        // Navigate to results page with formData
        const queryString = `?formData=${encodeURIComponent(
          JSON.stringify(formData)
        )}`;
        router.push(`/results${queryString}`);
        // setShowResults(true); // No longer needed
      } catch (error) {
        setFormError("Failed to submit form. Please try again later.");
      }
    } else {
      setFormError("Please correct the errors in the form.");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        formErrors,
        formError,
        results, // Keep results state for potential direct access if needed, though results page recalculates
        // showResults, // Remove modal state
        setFormError,
        handleSubmit,
        handleInputChange,
        showFeedbackForm,
        setShowFeedbackForm,
        setResults, // Keep setResults
        // setShowResults, // Remove modal setter
        handleFeedbackSubmit,
        feedbackMessage,
        feedbackError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use Form Context
export const useFormContext = () => useContext(FormContext);
