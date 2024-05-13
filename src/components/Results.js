// In Results.js
import React from "react"; // Importing useRef
import { Col, Row } from "react-bootstrap";
import CostDetails from "./CostDetails";
import Affordability from "./Affordability";
import { useFormContext } from "../context/FormContext";
import "./Results.css";

function Results({ costDetailsRef, affordabilityRef }) {
  const { results } = useFormContext();
  const canAfford = results && results.canAfford;

  return (
    <Row className="mt-4 justify-content-center">
      {results && (
        <>
          <Col
            xs={12}
            md={8}
            lg={6}
            className={`result-box ${
              canAfford ? "affordable" : "unaffordable"
            }`}
            ref={costDetailsRef}
          >
            <CostDetails />
          </Col>
          <Col
            xs={12}
            md={8}
            lg={6}
            className={`result-box ${
              canAfford ? "affordable" : "unaffordable"
            }`}
            ref={affordabilityRef}
          >
            <Affordability />
          </Col>
        </>
      )}
    </Row>
  );
}

export default Results;
