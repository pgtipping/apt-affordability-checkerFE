// CostDetails.js
import React from "react";
import { useFormContext } from "../context/FormContext";

const CostDetails = () => {
  const { results } = useFormContext();

  if (!results) return null;

  return (
    <div>
      <h2>Cost Details</h2>
      <p>Initial Costs: ${results.initialCosts}</p>
      <p>Total Monthly Costs: ${results.totalMonthlyCost}</p>
      <p>Total Cost Over Time: ${results.totalCostOverTime}</p>
    </div>
  );
};

export default CostDetails;
