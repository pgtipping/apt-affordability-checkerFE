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
      {/* Heading removed, provided by parent Card */}
      <p>You {results.canAfford ? "can" : "cannot"} afford this apartment.</p>
      {/* Removed conditional block for duration/additional income for simplicity */}
      {/* We can add more detailed explanations later if needed */}
    </div>
  );
};

export default Affordability;
