import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import CostDetails from "@/components/CostDetails";
import Affordability from "@/components/Affordability";
import RentEstimateView from "@/components/views/RentEstimateView";
import { useFormContext } from "@/context/FormContext";
import ReactMarkdown from "react-markdown";

function Results({ showResults, setShowResults }) {
  const { results, formData } = useFormContext();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to determine if we have all required data
  const canGenerateSummary =
    !!formData &&
    !!formData.rentEstimates &&
    !!results &&
    Object.keys(formData).length > 0;

  useEffect(() => {
    // Only fetch summary if modal is shown, results exist, and rentEstimates exist
    if (showResults && canGenerateSummary) {
      setLoading(true);
      setError("");
      setSummary("");

      fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          rentEstimates: formData.rentEstimates,
          affordabilityResults: results,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to generate summary");
          }
          return res.json();
        })
        .then((data) => {
          setSummary(data.summary || "");
        })
        .catch((err) => {
          setError(
            err.message || "An error occurred while generating the AI summary."
          );
        })
        .finally(() => setLoading(false));
    }
  }, [showResults, canGenerateSummary]);

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
            <div className="results-divider" />
            <div className="ai-summary-section mt-3">
              <h5>AI-Powered Personalized Summary</h5>
              {loading && (
                <div className="d-flex align-items-center mb-2">
                  <Spinner animation="border" size="sm" className="me-2" />
                  <span>Generating summary...</span>
                </div>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              {!loading && !error && summary && (
                <div className="ai-summary-markdown">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              )}
            </div>
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
