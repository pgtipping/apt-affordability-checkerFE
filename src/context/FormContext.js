import React, { createContext, useContext, useState } from "react";

// Create a Context
const FormContext = createContext();

// Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    movingCost: "",
    immediateCost: "",
    rent: "",
    securityDeposit: "",
    utilities: "",
    associatedCost: "",
    netIncome: "",
    savings: "",
    monthsToEvaluate: "",
    otherExpenses: "",
    // savingsGoal: "",
  });

  const [formErrors, setFormErrors] = useState({
    movingCostError: "",
    immediateCostError: "",
    rentError: "",
    securityDepositError: "",
    utilitiesError: "",
    associatedCostError: "",
    netIncomeError: "",
    savingsError: "",
    monthsToEvaluateError: "",
    otherExpensesError: "",
    // savingsGoalError: "",
  });
  const [formError, setFormError] = useState(""); // Global form error state
  const [results, setResults] = useState(null); // State to store calculation results
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // handle feedback submissions

  const handleFeedbackSubmit = async (feedback) => {
    console.log("Feedback submitted:", feedback);
    try {
      const response = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Feedback submission success:", data);
        setShowFeedbackForm(false); // Optionally close the form on successful submission
      } else {
        throw new Error(data.error || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally handle errors specifically related to feedback submission
    }
  };

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    let fieldLabel = fieldName;
    // Map field names to field labels
    switch (fieldName) {
      case "movingCost":
        fieldLabel = "Moving Cost";
        break;
      case "immediateCost":
        fieldLabel = "Immediate Cost";
        break;
      case "rent":
        fieldLabel = "Rent";
        break;
      case "securityDeposit":
        fieldLabel = "Security Deposit";
        break;
      case "utilities":
        fieldLabel = "Utilities";
        break;
      case "associatedCost":
        fieldLabel = "Associated Cost";
        break;
      case "netIncome":
        fieldLabel = "Net Income";
        break;
      case "savings":
        fieldLabel = "Savings";
        break;
      case "monthsToEvaluate":
        fieldLabel = "Months To Evaluate";
        break;
      case "otherExpenses":
        fieldLabel = "Other Expenses";
        break;
      default:
        break;
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    validateField(fieldName, value, fieldLabel); // Assuming validateField updates the appropriate error in state
  };

  const validateField = (fieldName, value, fieldLabel) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = `${fieldLabel} is required.`;
    }
    if (isNaN(value) || value < 0) {
      errorMessage = `Please enter a valid positive number for ${fieldLabel}.`;
    }
    if (fieldName === "Months To Evaluate" && (value < 1 || value > 60)) {
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
    console.log("Submit button clicked");
    setFormError(""); // Reset form error message

    // Validate all fields before submission
    const isFormValid = Object.keys(formData).every((key) => {
      const isValid = validateField(key, formData[key]);
      return isValid; // Update validation state
    });

    console.log("Form validation status:", isFormValid);

    if (isFormValid) {
      console.log("Form is valid, proceed with calculation.");
      console.log("Data to be sent:", formData);
      // Proceed with form submission
      try {
        const response = await fetch("http://localhost:3001/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setResults(data); // Update the results state with the response
        console.log("Success:", data);
        // Handle response data here
      } catch (error) {
        console.error("Error:", error);
        setFormError("Failed to submit form. Please try again later.");
      }
    } else {
      setFormError("Please correct the errors in the form.");
      console.log("Validation failed"); // Log if validation fails
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        formErrors,
        formError,
        results,
        setFormError,
        handleSubmit,
        handleInputChange,
        showFeedbackForm,
        setShowFeedbackForm,
        handleFeedbackSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
// Custom hook to use Form Context
export const useFormContext = () => useContext(FormContext);
