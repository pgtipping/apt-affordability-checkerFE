// CostDetails.js
import React from "react";
import { useFormContext } from "@/context/FormContext"; // Use path alias

const CostDetails = () => {
  const { results } = useFormContext();

  if (!results) return null;

  return (
    <div>
      <h2>Cost Details</h2>
      <p>Initial Costs: ${results.initialCosts}</p>
      <p>Total Monthly Costs: ${results.totalMonthlyCosts}</p>{" "}
      {/* Fix typo: Cost -> Costs */}
      <p>Total Cost Over Time: ${results.totalCostOverTime}</p>
    </div>
  );
};

export default CostDetails;
