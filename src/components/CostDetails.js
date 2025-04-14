// CostDetails.js
import React from "react";
// Temporarily remove formatCurrency import to test direct toLocaleString
// import { formatCurrency } from "@/utils/formatCurrency";

// Helper for direct formatting (handles potential null/NaN)
const formatDirectly = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "$ -"; // Handle non-numeric inputs
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Accept results as a prop instead of using context
const CostDetails = ({ results }) => {
  // Basic check if results prop is provided
  if (!results) {
    // Optionally return a loading state or placeholder
    return <div>Loading cost details...</div>;
  }

  // Log values and types before formatting
  console.log(
    "CostDetails - initialCosts:",
    results.initialCosts,
    typeof results.initialCosts
  );
  console.log(
    "CostDetails - totalMonthlyCosts:",
    results.totalMonthlyCosts,
    typeof results.totalMonthlyCosts
  );
  console.log(
    "CostDetails - totalCostOverTime:",
    results.totalCostOverTime,
    typeof results.totalCostOverTime
  );

  return (
    <div>
      <p>Initial Costs: {formatDirectly(results.initialCosts)}</p>
      <p>Total Monthly Costs: {formatDirectly(results.totalMonthlyCosts)}</p>
      <p>Total Cost Over Time: {formatDirectly(results.totalCostOverTime)}</p>
    </div>
  );
};

export default CostDetails;
