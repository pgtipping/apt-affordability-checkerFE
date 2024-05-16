// In Results.js
import React from "react"; // Importing useRef
import { Modal, Button } from "react-bootstrap";
import CostDetails from "./CostDetails";
import Affordability from "./Affordability";
import "./Results.css";
import { useFormContext } from "../context/FormContext";

function Results({ showResults, setShowResults }) {
  const { results } = useFormContext();

  return (
    <Modal show={showResults} onHide={() => setShowResults(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {results && (
          <>
            <CostDetails />
            <Affordability />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowResults(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Results;
