// CostDetails.js
import React from "react";
// Restore central utility function import
import { formatCurrency } from "@/utils/formatCurrency";

// Removed local formatDirectly helper

// Accept results as a prop instead of using context
const CostDetails = ({ results }) => {
  // Basic check if results prop is provided
  if (!results) {
    // Optionally return a loading state or placeholder
    return <div>Loading cost details...</div>;
  }

  // Removed console logs

  return (
    <div>
      <p>Initial Costs: {formatCurrency(results.initialCosts)}</p>
      <p>Total Monthly Costs: {formatCurrency(results.totalMonthlyCosts)}</p>
      <p>Total Cost Over Time: {formatCurrency(results.totalCostOverTime)}</p>
    </div>
  );
};

export default CostDetails;
