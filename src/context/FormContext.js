import React, { createContext, useContext, useState } from "react";

// Create a Context
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
    try {
      const response = await fetch(`${apiBaseUrl}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowFeedbackForm(false); // Optionally close the form on successful submission
      } else {
        throw new Error(data.error || "Failed to submit feedback");
      }
    } catch (error) {
      // Optionally handle errors specifically related to feedback submission
    }
  };

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    validateField(fieldName, value); // Assuming validateField updates the appropriate error in state
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    const fieldLabel = fieldLabels[fieldName]; // Get the label for the field name

    if (!value) {
      errorMessage = `${fieldLabel} is required.`;
    }
    if (isNaN(value) || value < 0) {
      errorMessage = `Please enter a valid positive number for ${fieldLabel}.`;
    }
    if (fieldName === "monthsToEvaluate" && (value < 1 || value > 60)) {
      errorMessage = `Please enter a valid range between 1 and 60 for ${fieldLabel}.`;
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
      const isValid = validateField(key, formData[key]);
      return isValid; // Update validation state
    });

    if (isFormValid) {
      // Proceed with form submission
      try {
        const response = await fetch(`${apiBaseUrl}/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use Form Context
export const useFormContext = () => useContext(FormContext);
