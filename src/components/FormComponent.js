import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useFormContext } from "../context/FormContext";
import MovingCostInput from "./forms/MovingCostInput";
import ImmediateCostInput from "./forms/ImmediateCostInput";
import RentInput from "./forms/RentInput";
import SecurityDepositInput from "./forms/SecurityDepositInput";
import UtilitiesInput from "./forms/UtilitiesInput";
import AssociatedCostInput from "./forms/AssociatedCostInput";
import NetHouseholdIncomeInput from "./forms/NetHouseholdIncomeInput";
import TotalSavingsInput from "./forms/TotalSavingsInput";
import MonthsToEvaluateInput from "./forms/MonthsToEvaluateInput";
import OtherMonthlyExpensesInput from "./forms/OtherMonthlyExpensesInput";
import Results from "./Results";
import FeedbackForm from "./FeedbackForm";
import "./FormComponent.css";
import { Form } from "react-bootstrap";

function FormComponent() {
  const { handleSubmit, formError, showFeedbackForm, setShowFeedbackForm } =
    useFormContext();

  const feedbackTooltip = (
    <Tooltip id="feedback-tooltip">Leave us feedback</Tooltip>
  );

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <Container className={darkMode ? "dark-mode" : ""}>
      <Row className="justify-content-center mt-3">
        <Col>
          <Form.Check
            type="switch"
            id="darkModeSwitch"
            label="Dark Mode"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={10} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="m-0">Apartment Cost Analyzer</h1>
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
            <MovingCostInput />
            <ImmediateCostInput />
            <RentInput />
            <SecurityDepositInput />
            <UtilitiesInput />
            <AssociatedCostInput />
            <NetHouseholdIncomeInput />
            <TotalSavingsInput />
            <MonthsToEvaluateInput />
            <OtherMonthlyExpensesInput />
            <Button
              type="submit"
              className={`btn ${darkMode ? "btn-dark" : "btn-primary"}`}
              onClick={handleCalculate}
            >
              Calculate
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
  );
}

export default FormComponent;
