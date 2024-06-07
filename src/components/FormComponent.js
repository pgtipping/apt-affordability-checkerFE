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
import { useFormContext } from "../context/FormContext";
import MovingAndSetupCostInput from "./forms/MovingAndSetupCostInput";
import MonthlyLivingCostInput from "./forms/MonthlyLivingCostInput";
import MonthlyRentInput from "./forms/RentInput";
import SecurityDepositInput from "./forms/SecurityDepositInput";
import TotalMonthlyIncomeInput from "./forms/NetHouseholdIncomeInput";
import TotalSavingsInput from "./forms/TotalSavingsInput";
import MonthsToEvaluateInput from "./forms/MonthsToEvaluateInput";
import Results from "./Results";
import FeedbackForm from "./FeedbackForm";
import Footer from "./Footer"; // Import the Footer component
import "./FormComponent.css";

function FormComponent() {
  const {
    handleSubmit,
    formData,
    setFormData,
    formError,
    showFeedbackForm,
    setShowFeedbackForm,
    handleInputChange,
  } = useFormContext();
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userAdjustedSecurityDeposit, setUserAdjustedSecurityDeposit] =
    useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    }
  }, [darkMode]);

  const feedbackTooltip = (
    <Tooltip id="feedback-tooltip">Leave us feedback</Tooltip>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark-mode");
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
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <Container className="content-wrap mt-6">
        <Row className="justify-content-center mt-3">
          <Col>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="/sunny.png"
                alt="Light Mode"
                style={{ width: "55px" }}
              />
              <Form.Check
                type="switch"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <img src="/moon.png" alt="Dark Mode" style={{ width: "50px" }} />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={10} lg={8}>
            <div className="blog-intro mb-4">
              <h2>Welcome to the Apartment Affordability Analyzer!</h2>
              <p>
                Finding a new apartment is an exciting journey, but figuring out
                if you can afford it can be daunting. Our Apartment
                Affordability Analyzer helps you evaluate your ability to afford
                your new apartment with ease. Simply input the rental amount and
                other associated costs, and let our tool do the rest. Whether
                you're calculating moving costs, utilities, or other monthly
                expenses, our analyzer provides a comprehensive view of your
                financial commitment. Let's get started and ensure your new home
                fits comfortably within your budget!
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="m-0">Apartment Affordability Analyzer</h1>
              <OverlayTrigger placement="left" overlay={feedbackTooltip}>
                <Button
                  variant={darkMode ? "outline-light" : "outline-primary"}
                  onClick={() => setShowFeedbackForm(true)}
                >
                  Feedback
                </Button>
              </OverlayTrigger>
            </div>
            {showFeedbackForm && <FeedbackForm />}
            <form onSubmit={handleSubmit}>
              <MovingAndSetupCostInput
                onInputChange={handleInputChangeWrapper}
              />
              <MonthlyLivingCostInput
                onInputChange={handleInputChangeWrapper}
              />
              <MonthlyRentInput onInputChange={handleInputChangeWrapper} />
              <SecurityDepositInput onInputChange={handleInputChangeWrapper} />
              <TotalMonthlyIncomeInput
                onInputChange={handleInputChangeWrapper}
              />
              <TotalSavingsInput onInputChange={handleInputChangeWrapper} />
              <MonthsToEvaluateInput onInputChange={handleInputChangeWrapper} />
              <Button
                type="submit"
                className={`btn ${darkMode ? "btn-dark" : "btn-primary"}`}
                onClick={handleCalculate}
              >
                Calculate Affordability
              </Button>
              {formError && <div className="error mt-3">{formError}</div>}
            </form>
            <Results
              results={results}
              showResults={showResults}
              setShowResults={setShowResults}
            />
          </Col>
        </Row>
      </Container>
      <Footer /> {/* Render the Footer component outside the container */}
    </div>
  );
}

export default FormComponent;
