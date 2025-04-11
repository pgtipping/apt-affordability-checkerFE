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

  return (
    <div className={styles.container}>
      <h3>Rent Estimates</h3>
      {formData.rentEstimates ? (
        <>
          <div className={styles.estimates}>
            <div className={styles.estimateItem}>
              <span>Average Rent:</span>
              <span>${formData.rentEstimates.averageRent}</span>
            </div>
            <div className={styles.estimateItem}>
              <span>Range:</span>
              <span>
                ${formData.rentEstimates.lowRent} - $
                {formData.rentEstimates.highRent}
              </span>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Rent"]} />
                <Bar dataKey="value" fill="#2e7d32" />
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
