import React from "react";
import CustomInput from "./CustomInput";
import { useFormContext } from "../../context/FormContext";

function MonthlySavingsGoalInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();
  return (
    <CustomInput
      id="monthly-savings-goal"
      label="Monthly Savings/Investment"
      placeholder="Enter your monthly savings / investment amount"
      tooltipText="Amount you save and/or invest monthly."
      type="number"
      value={formData.savingsGoal}
      onChange={(e) => handleInputChange("savingsGoal", e.target.value)}
      error={formErrors.savingsGoalError}
    />
  );
}

export default MonthlySavingsGoalInput;
