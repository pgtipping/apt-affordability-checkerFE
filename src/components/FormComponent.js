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
import Results from "@/components/Results";
import FeedbackForm from "@/components/FeedbackForm";
import Footer from "@/components/Footer"; // Import the Footer component
import styles from "./FormComponent.module.css";

function FormComponent() {
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
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default
  const [flipping, setFlipping] = useState(false);
  const [userAdjustedSecurityDeposit, setUserAdjustedSecurityDeposit] =
    useState(false);

  useEffect(() => {
    // Ensure dark mode is set on initial load
    document.documentElement.classList.add("dark-mode");
  }, []);

  const feedbackTooltip = (
    <Tooltip id="feedback-tooltip">How can we make this more useful?</Tooltip>
  );

  const toggleDarkMode = () => {
    setFlipping(true);
    setTimeout(() => {
      setDarkMode((prevDarkMode) => !prevDarkMode);
      document.documentElement.classList.toggle("dark-mode");
      setFlipping(false);
    }, 500); // Duration of the flip animation
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    handleSubmit(e); // Handle form submission
    setResults({}); // Assuming this will hold the calculation results
    setShowResults(true); // Show the results modal
  };

  useEffect(() => {
    if (!userAdjustedSecurityDeposit) {
      setFormData((prev) => ({
        ...prev,
        securityDeposit: formData.rent,
      }));
    }
  }, [formData.rent, userAdjustedSecurityDeposit, setFormData]);

  const handleInputChangeWrapper = (fieldName, value) => {
    if (fieldName === "securityDeposit") {
      setUserAdjustedSecurityDeposit(true);
    }
    handleInputChange(fieldName, value);
  };

  return (
    <div
      className={`${styles["page-container"]} ${
        darkMode ? styles["dark-mode"] : ""
      }`}
    >
      <header>
        <Container className={styles["content-wrap"]}>
          <Row className="justify-content-center">
            <Col>
              <div className="d-flex align-items-center justify-content-center pt-3">
                <div
                  className={`${styles["toggle-icon"]} ${
                    flipping ? styles.flip : ""
                  }`}
                  onClick={toggleDarkMode}
                >
                  <img
                    src={darkMode ? "/moon.png" : "/sunny.png"}
                    alt={darkMode ? "Dark Mode" : "Light Mode"}
                    style={{
                      width: "55px",
                      cursor: "pointer",
                      transition: "transform 0.5s, opacity 0.5s",
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <main>
        <Container className={styles["content-wrap"] + " mt-6"}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={10} lg={8}>
              <div className={styles["blog-intro"] + " mb-4"}>
                <h1 className="m-0">Apartment Affordability Checker</h1>
                <p>
                  Welcome to the Apartment Affordability Checker, a
                  comprehensive web application designed to help users evaluate
                  their ability to afford a new apartment. It evaluates cost
                  associated with moving and living in the new apartment and
                  your overall earnings. Features include real-time
                  calculations, light/dark mode, and user feedback.{" "}
                </p>
              </div>
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <OverlayTrigger placement="right" overlay={feedbackTooltip}>
                  <Button
                    variant={darkMode ? "outline-light" : "outline-primary"}
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    Feedback
                  </Button>
                </OverlayTrigger>
              </div>
              {showFeedbackForm && <FeedbackForm darkMode={darkMode} />}
              <Form onSubmit={handleSubmit}>
                <MovingAndSetupCostInput
                  onInputChange={handleInputChangeWrapper}
                />
                <MonthlyLivingCostInput
                  onInputChange={handleInputChangeWrapper}
                />
                <LocationInput onInputChange={handleInputChangeWrapper} />
                <RentEstimateInput onInputChange={handleInputChangeWrapper} />
                <SecurityDepositInput
                  onInputChange={handleInputChangeWrapper}
                />
                <TotalMonthlyIncomeInput
                  onInputChange={handleInputChangeWrapper}
                />
                <TotalSavingsInput onInputChange={handleInputChangeWrapper} />
                <MonthsToEvaluateInput
                  onInputChange={handleInputChangeWrapper}
                />
                <Button
                  type="submit"
                  className={`btn ${darkMode ? "btn-dark" : "btn-primary"} ${
                    styles["calculate-button"]
                  }`}
                  onClick={handleCalculate}
                >
                  Calculate Affordability
                </Button>
                {formError && (
                  <div className={styles.error + " mt-3"}>{formError}</div>
                )}
              </Form>
              <Results
                results={results}
                showResults={showResults}
                setShowResults={setShowResults}
              />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer /> {/* Render the Footer component outside the container */}
    </div>
  );
}

export default FormComponent;
