import React from "react";
// Restore central utility function import
import { formatCurrency } from "@/utils/formatCurrency";
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

// Removed local formatDirectly helper

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
        <div>
          {/* Removed console logs */}
          <div className={styles.estimates}>
            <div className={styles.estimateItem}>
              <span>Average Rent:</span>
              <span style={{ color: "#1b5e20" }}>
                {/* Use central utility function */}
                {formatCurrency(rentEstimates.averageRent)}
              </span>
            </div>
            <div className={styles.estimateItem}>
              <span>Range:</span>
              <span style={{ color: "#1b5e20" }}>
                {/* Use central utility function */}
                {formatCurrency(rentEstimates.lowRent)} -{" "}
                {formatCurrency(rentEstimates.highRent)}
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
                  // Use central utility function in tooltip
                  formatter={(value) => [formatCurrency(value), "Rent"]}
                />
                <Bar dataKey="value" fill="#1b5e20" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> // Changed closing fragment to match opening div
      ) : (
        <p className={styles.noData}>
          No rent estimates available. Enter a location to get estimates.
        </p>
      )}
    </div>
  );
};

export default RentEstimateView;
