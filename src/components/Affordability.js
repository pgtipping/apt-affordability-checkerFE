// Affordability.js
import React from "react";
// Remove formatCurrency import, apply formatting directly
// import { formatCurrency } from "@/utils/formatCurrency";

// Helper for direct formatting (handles potential null/NaN)
// Duplicated here for clarity, could be moved back to utils if this works
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

// Accept 'results' prop directly from parent page
const Affordability = ({ results }) => {
  // Check the passed prop
  if (!results) {
    return <div>Loading affordability details...</div>; // Or null, or placeholder
  }

  return (
    <div>
      <p>
        You{" "}
        <strong className={results.canAfford ? "text-success" : "text-danger"}>
          {results.canAfford ? "can" : "cannot"}
        </strong>{" "}
        afford this apartment based on the provided details.
      </p>
      {!results.canAfford && results.additionalMonthlyIncomeNeeded > 0 && (
        <>
          {/* Log value and type before formatting */}
          {console.log(
            "Affordability - additionalMonthlyIncomeNeeded:",
            results.additionalMonthlyIncomeNeeded,
            typeof results.additionalMonthlyIncomeNeeded
          )}
          <p className="text-danger">
            You would need an additional{" "}
            <strong>
              {/* Apply direct formatting */}
              {formatDirectly(results.additionalMonthlyIncomeNeeded)}
            </strong>{" "}
            in monthly net income to afford the estimated monthly costs.
          </p>
        </>
      )}
      {/* Add more detailed explanations or suggestions here later if needed */}
    </div>
  );
};

export default Affordability;
