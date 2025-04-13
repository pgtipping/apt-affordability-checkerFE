// Affordability.js
import React from "react";
// import { useFormContext } from "@/context/FormContext"; // No longer needed, use props

// Accept 'results' prop directly from parent page
const Affordability = ({ results }) => {
  // Remove context fetching: const { results } = useFormContext();

  // Check the passed prop
  if (!results) return null;
  return (
    <div>
      <h2>Affordability Details</h2>
      <p>You {results.canAfford ? "can" : "cannot"} afford this apartment.</p>
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
