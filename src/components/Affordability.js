// Affordability.js
import React from "react";
import { useFormContext } from "../context/FormContext";

const Affordability = ({ affordability }) => {
  const { results } = useFormContext();
  if (!results) return null;
  return (
    <div>
      <h2>Affordability Details</h2>
      <p>Can you afford this apartment? {results.canAfford ? "Yes" : "No"}</p>
      {results.canAfford ? (
        <p>
          You can afford this apartment for {results.affordabilityDuration}{" "}
          months.
        </p>
      ) : (
        <p>
          You need an additional ${results.additionalMonthlyIncomeNeeded} per
          month to afford this apartment.
        </p>
      )}
    </div>
  );
};

export default Affordability;
