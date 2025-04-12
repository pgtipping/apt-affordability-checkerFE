import React from "react";
import { Modal, Button } from "react-bootstrap";
import CostDetails from "@/components/CostDetails";
import Affordability from "@/components/Affordability";
import RentEstimateView from "@/components/views/RentEstimateView";
import { useFormContext } from "@/context/FormContext";

function Results({ showResults, setShowResults }) {
  const { results, formData } = useFormContext();

  return (
    <Modal show={showResults} onHide={() => setShowResults(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* User guidance/summary explanation */}
        <div
          className="results-summary mb-3"
          style={{ fontSize: "1rem", color: "#333" }}
        >
          <strong>How to read your results:</strong> This summary shows your
          estimated affordability, a breakdown of your costs, and local rent
          estimates for your chosen location. Use these insights to plan your
          move and ensure your new housing fits your budget.
        </div>
        {results && (
          <>
            <Affordability />
            <div className="results-divider" />
            <CostDetails />
            {formData.rentEstimates && (
              <>
                <div className="results-divider" />
                <RentEstimateView />
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShowResults(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Results;
