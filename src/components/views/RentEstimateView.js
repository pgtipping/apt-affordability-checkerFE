import React from "react";
// Remove formatCurrency import, apply formatting directly
// import { formatCurrency } from "@/utils/formatCurrency";
import styles from "./RentEstimateView.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

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

// Accept rentEstimates as a prop
const RentEstimateView = ({ rentEstimates }) => {
  // Remove context fetching: const { formData } = useFormContext();

  // Use the rentEstimates prop for chart data
  const chartData = rentEstimates
    ? [
        { name: "Low", value: rentEstimates.lowRent },
        { name: "Average", value: rentEstimates.averageRent },
        { name: "High", value: rentEstimates.highRent },
      ]
    : [];

  // Accessibility: ARIA label for the chart
  const chartAriaLabel =
    "Bar chart showing low, average, and high rent estimates for the selected location.";

  // Data source and confidence note
  // Use the rentEstimates prop for source and confidence
  const source = rentEstimates?.source || "RentCast API";
  const confidence = rentEstimates?.confidence
    ? `Confidence: ${rentEstimates.confidence}`
    : "";

  return (
    <div className={styles.container}>
      {/* Check the rentEstimates prop */}
      {rentEstimates ? (
        <>
          {/* Log values and types before formatting */}
          {console.log(
            "RentEstimateView - averageRent:",
            rentEstimates.averageRent,
            typeof rentEstimates.averageRent
          )}
          {console.log(
            "RentEstimateView - lowRent:",
            rentEstimates.lowRent,
            typeof rentEstimates.lowRent
          )}
          {console.log(
            "RentEstimateView - highRent:",
            rentEstimates.highRent,
            typeof rentEstimates.highRent
          )}
          <div className={styles.estimates}>
            <div className={styles.estimateItem}>
              <span>Average Rent:</span>
              <span style={{ color: "#1b5e20" }}>
                {/* Apply direct formatting */}
                {formatDirectly(rentEstimates.averageRent)}
              </span>
            </div>
            <div className={styles.estimateItem}>
              <span>Range:</span>
              <span style={{ color: "#1b5e20" }}>
                {/* Apply direct formatting */}
                {formatDirectly(rentEstimates.lowRent)} -{" "}
                {formatDirectly(rentEstimates.highRent)}
              </span>
            </div>
            <div className={styles.estimateItem}>
              <span>Source:</span>
              <span>{source}</span>
            </div>
            {confidence && (
              <div className={styles.estimateItem}>
                <span></span>
                <span>{confidence}</span>
              </div>
            )}
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                aria-label={chartAriaLabel}
                role="img"
                aria-labelledby="rent-estimates-title"
              >
                <XAxis dataKey="name">
                  <Label
                    value="Estimate Type"
                    offset={-5}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Rent ($)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip
                  // Apply direct formatting in tooltip
                  // Also log the value passed to the tooltip formatter
                  formatter={(value) => {
                    console.log(
                      "RentEstimateView Tooltip - value:",
                      value,
                      typeof value
                    );
                    return [formatDirectly(value), "Rent"];
                  }}
                />
                <Bar dataKey="value" fill="#1b5e20" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className={styles.noData}>
          No rent estimates available. Enter a location to get estimates.
        </p>
      )}
    </div>
  );
};

export default RentEstimateView;
