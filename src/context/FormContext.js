import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

// Provider Component
export const FormProvider = ({ children }) => {
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
  const [showResults, setShowResults] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  // Field name to label mapping
  const fieldLabels = {
    movingAndSetupCost: "Moving & Setup Costs",
    monthlyLivingCost: "Monthly Living Costs",
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
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
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
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to fetch market rent estimate"
        );
      }

      const estimate = await response.json();

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
      console.error("Failed to fetch market rent estimates:", error);
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
      if (!errorMessage && fieldName === "rent") {
        const income = Number(formData.totalMonthlyIncome);
        if (!isNaN(income) && num > income) {
          errorMessage = `Monthly Rent should not exceed Total Monthly Income.`;
        }
      }
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

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${fieldName}Error`]: errorMessage,
    }));
    return errorMessage === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); // Reset form error message

    // Validate all fields before submission
    const isFormValid = Object.keys(formData).every((key) => {
      // Skip validation for rentEstimates
      if (key === "rentEstimates") return true;
      const isValid = validateField(key, formData[key]);
      return isValid; // Update validation state
    });

    if (isFormValid) {
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
        setResults(data); // Update the results state with the response
        // Handle response data here
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
        results,
        showResults,
        setFormError,
        handleSubmit,
        handleInputChange,
        showFeedbackForm,
        setShowFeedbackForm,
        setResults,
        setShowResults,
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
