import React from "react";
import { useFormContext } from "../../context/FormContext";
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

const RentEstimateView = () => {
  const { formData } = useFormContext();

  const chartData = formData.rentEstimates
    ? [
        { name: "Low", value: formData.rentEstimates.lowRent },
        { name: "Average", value: formData.rentEstimates.averageRent },
        { name: "High", value: formData.rentEstimates.highRent },
      ]
    : [];

  // Accessibility: ARIA label for the chart
  const chartAriaLabel =
    "Bar chart showing low, average, and high rent estimates for the selected location.";

  // Data source and confidence note
  const source = formData.rentEstimates?.source || "RentCast API";
  const confidence = formData.rentEstimates?.confidence
    ? `Confidence: ${formData.rentEstimates.confidence}`
    : "";

  return (
    <div className={styles.container}>
      <h3 id="rent-estimates-title">Rent Estimates</h3>
      {formData.rentEstimates ? (
        <>
          <div className={styles.estimates}>
            <div className={styles.estimateItem}>
              <span>Average Rent:</span>
              <span style={{ color: "#1b5e20" }}>
                ${formData.rentEstimates.averageRent}
              </span>
            </div>
            <div className={styles.estimateItem}>
              <span>Range:</span>
              <span style={{ color: "#1b5e20" }}>
                ${formData.rentEstimates.lowRent} - $
                {formData.rentEstimates.highRent}
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
                <Tooltip formatter={(value) => [`$${value}`, "Rent"]} />
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
