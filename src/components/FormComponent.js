import React, { useState, useEffect } from "react";

import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { useFormContext } from "@/context/FormContext";
import MovingAndSetupCostInput from "@/components/forms/MovingAndSetupCostInput";
import MonthlyLivingCostInput from "@/components/forms/MonthlyLivingCostInput";
import LocationInput from "@/components/forms/LocationInput";
import RentEstimateInput from "@/components/forms/RentEstimateInput";
import SecurityDepositInput from "@/components/forms/SecurityDepositInput";
import TotalMonthlyIncomeInput from "@/components/forms/NetHouseholdIncomeInput";
import TotalSavingsInput from "@/components/forms/TotalSavingsInput";
import MonthsToEvaluateInput from "@/components/forms/MonthsToEvaluateInput";
// import Results from "@/components/Results"; // Remove Results import (now a separate page)

import styles from "./FormComponent.module.css";
import Link from "next/link";

function FormComponent({ darkMode, toggleDarkMode }) {
  // Feedback and error handling can still use context
  const [userAdjustedSecurityDeposit, setUserAdjustedSecurityDeposit] = useState(false);



  // Restore handleInputChangeWrapper to use context
  const {
    handleSubmit,
    formData,
    setFormData,
    formError,
    showFeedbackForm,
    setShowFeedbackForm,
    handleInputChange,
    feedbackMessage,
    feedbackError,
  } = useFormContext();

  const handleInputChangeWrapper = (fieldName, value) => {
    if (fieldName === "securityDeposit") {
      setUserAdjustedSecurityDeposit(true);
    }
    handleInputChange(fieldName, value);
  };

  return (
    <div className={`${styles["page-container"]} ${darkMode ? styles["dark-mode"] : ""}`}>
      {/* No header/intro here; handled by parent */}
      <main>
        <Container className={styles["content-wrap"] + " mt-6"}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={10} lg={8}>
              {/* Feedback confirmation/error messages */}
              {feedbackMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {feedbackMessage}
                  {/* Optionally add a close button */}
                </div>
              )}
              {feedbackError && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {feedbackError}
                  {/* Optionally add a close button */}
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <MovingAndSetupCostInput
                  value={formData.movingAndSetupCost || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <MonthlyLivingCostInput
                  value={formData.monthlyLivingCost || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <LocationInput
                  value={formData.location || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <RentEstimateInput
                  value={formData.rentEstimates || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <SecurityDepositInput
                  value={formData.securityDeposit || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <TotalMonthlyIncomeInput
                  value={formData.netIncome || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <TotalSavingsInput
                  value={formData.savings || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <MonthsToEvaluateInput
                  value={formData.monthsToEvaluate || ""}
                  onInputChange={handleInputChangeWrapper}
                />
                <Button
                  type="submit"
                  className={`btn ${darkMode ? "btn-dark" : "btn-primary"} ${
                    styles["calculate-button"]
                  }`}
                >
                  Check Affordability
                </Button>
                {formError && (
                  <div className={styles.error + " mt-3"}>{formError}</div>
                )}
              </Form>
              {/* Remove Results component rendering - now handled by pages/results.js */}
            </Col>
          </Row>
        </Container>
      </main>

    </div>
  );
}

export default FormComponent;
