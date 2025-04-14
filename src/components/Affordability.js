// Affordability.js
import React from "react";
// Restore central utility function import
import { formatCurrency } from "@/utils/formatCurrency";

// Removed local formatDirectly helper

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
        <p className="text-danger">
          You would need an additional{" "}
          <strong>
            {/* Use central utility function */}
            {formatCurrency(results.additionalMonthlyIncomeNeeded)}
          </strong>{" "}
          in monthly net income to afford the estimated monthly costs.
        </p>
      )}
      {/* Add more detailed explanations or suggestions here later if needed */}
    </div>
  );
};

export default Affordability;
