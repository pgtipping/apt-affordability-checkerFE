import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Card, // Ensure Card is imported
} from "react-bootstrap";
import CostDetails from "@/components/CostDetails"; // Assuming calculations happen here or are passed
import Affordability from "@/components/Affordability"; // Assuming calculations happen here or are passed
import RentEstimateView from "@/components/views/RentEstimateView";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import Head from "next/head"; // For setting page title

// Helper function to parse query params safely
const parseQueryParam = (param) => {
  if (!param || typeof param !== "string") return null;
  try {
    // Decode URI component first, then parse JSON
    return JSON.parse(decodeURIComponent(param));
  } catch (e) {
    console.error("Error parsing query param:", e);
    return null; // Return null or default if parsing fails
  }
};

// Helper function to calculate results based on formData
const calculateResults = (formData) => {
  if (!formData) return null;

  const movingCost = Number(formData.movingAndSetupCost) || 0;
  const livingCost = Number(formData.monthlyLivingCost) || 0;
  const rentCost = Number(formData.rent) || 0;
  const depositCost = Number(formData.securityDeposit) || 0;
  const income = Number(formData.totalMonthlyIncome) || 0;
  const savings = Number(formData.totalSavings) || 0;
  const months = Number(formData.monthsToEvaluate) || 1;

  const initialCosts = movingCost + depositCost;
  const totalMonthlyCosts = livingCost + rentCost;
  const totalCostOverTime = initialCosts + totalMonthlyCosts * months;
  const monthlyNetIncome = income - totalMonthlyCosts;

  const canAffordInitial = savings >= initialCosts;
  const canAffordMonthly = monthlyNetIncome >= 0;
  const canAfford = canAffordInitial && canAffordMonthly;
  const additionalMonthlyIncomeNeeded = canAffordMonthly
    ? 0
    : Math.abs(monthlyNetIncome);

  // TODO: affordabilityDuration calculation if needed

  return {
    initialCosts: initialCosts.toFixed(2),
    totalMonthlyCosts: totalMonthlyCosts.toFixed(2),
    totalCostOverTime: totalCostOverTime.toFixed(2),
    canAfford: canAfford,
    additionalMonthlyIncomeNeeded: additionalMonthlyIncomeNeeded.toFixed(2),
    // affordabilityDuration: calculatedDuration, // Add when implemented
  };
};

export default function ResultsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [calculatedResults, setCalculatedResults] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [isReady, setIsReady] = useState(false); // State to track if router is ready

  useEffect(() => {
    // Ensure router is ready and we haven't already processed the data
    if (router.isReady && !formData) {
      const queryFormData = parseQueryParam(router.query.formData);

      if (queryFormData) {
        const results = calculateResults(queryFormData); // Calculate results
        if (results) {
          // Set state only if formData was parsed and results calculated
          setFormData(queryFormData);
          setCalculatedResults(results);
        } else {
          console.error("Results calculation failed from parsed query data.");
          // Handle error state - perhaps set an error message state here
        }
      } else {
        console.error("Form data missing or invalid in query parameters.");
        // Handle error state
      }
      setIsReady(true); // Mark router as ready (might move this inside successful data processing)
    } else if (router.isReady && formData) {
      // Data already processed, ensure isReady is true if it wasn't set before
      if (!isReady) setIsReady(true);
    }
  }, [router.isReady, router.query, formData, isReady]); // Add formData and isReady to dependency array

  // Fetch AI Summary
  useEffect(() => {
    // Only fetch if we have data and results
    if (isReady && formData && calculatedResults && formData.rentEstimates) {
      setLoadingSummary(true);
      setSummaryError("");
      setSummary("");

      fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          rentEstimates: formData.rentEstimates, // Pass rentEstimates if available
          affordabilityResults: calculatedResults,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            // Attempt to read error details, prioritizing JSON but handling plain text/HTML
            let errorMsg = `Failed to generate summary (Status: ${res.status})`;
            try {
              const errorData = await res.json(); // Try parsing as JSON first
              errorMsg = errorData.error || errorData.message || errorMsg;
            } catch (jsonError) {
              // If JSON parsing fails, try reading as text (might be HTML or plain text)
              try {
                const textError = await res.text();
                // Avoid showing long HTML pages as errors
                if (textError && !textError.trim().startsWith("<")) {
                  errorMsg = textError.substring(0, 100); // Show first 100 chars
                }
              } catch (textError) {
                // Ignore error reading text body
              }
            }
            throw new Error(errorMsg);
          }
          // Only parse JSON if response is ok
          return res.json();
        })
        .then((data) => {
          setSummary(data.summary || "");
        })
        .catch((err) => {
          // Log the actual error for debugging, but show a generic message to the user
          console.error("AI Summary Generation Error:", err);
          setSummaryError(
            "Could not connect to the service. Please check your internet connection and try again."
          );
        })
        .finally(() => setLoadingSummary(false));
    } else if (isReady && (!formData || !calculatedResults)) {
      setSummaryError(
        "Could not calculate results or fetch summary due to missing form data."
      );
    }
  }, [isReady, formData, calculatedResults]); // Depend on isReady, formData, and calculatedResults

  // Render loading state or error if data isn't ready
  if (!isReady || !formData || !calculatedResults) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {!isReady ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Alert variant="danger">Error: Could not load results data.</Alert>
        )}
      </Container>
    );
  }

  // Pass calculatedResults to child components
  // Note: Child components might need adjustment if they relied on context's 'results' object structure directly
  // For now, we assume they can work with the calculatedResults structure defined above.
  // We may need to create a temporary context provider here or pass props explicitly.
  // Let's try passing props first.

  return (
    <>
      <Head>
        <title>Affordability Results</title>
      </Head>
      <Container className="mt-4 mb-4">
        {/* Use Row for side-by-side layout on larger screens */}
        <Row>
          {/* Main Results Column */}
          <Col xs={12} lg={7} className="mb-4 mb-lg-0">
            {/* <h1>Affordability Results</h1> REMOVED */}
            <Button
              variant="secondary"
              size="sm" // Make button smaller
              onClick={() => router.back()}
              className="mb-3"
            >
              &larr; Back to Form
            </Button>

            {/* Affordability Card */}
            <Card className="mb-3">
              <Card.Header as="h5">Affordability Details</Card.Header>
              <Card.Body>
                <Affordability results={calculatedResults} />
              </Card.Body>
            </Card>

            {/* CostDetails Card */}
            <Card className="mb-3">
              <Card.Header as="h5">Cost Details</Card.Header>
              <Card.Body>
                <CostDetails results={calculatedResults} />
              </Card.Body>
            </Card>

            {/* Rent Estimates Card */}
            {formData.rentEstimates && (
              <Card className="mb-3">
                <Card.Header as="h5">Rent Estimates (Local Area)</Card.Header>
                <Card.Body>
                  <RentEstimateView rentEstimates={formData.rentEstimates} />
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* AI Summary Column */}
          <Col xs={12} lg={5}>
            {/* AI Summary Card */}
            <Card>
              <Card.Header as="h5">Summary & Recommendations</Card.Header>{" "}
              {/* CHANGED */}
              <Card.Body>
                {loadingSummary && (
                  <div className="d-flex align-items-center mb-2">
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span>Generating summary...</span>
                  </div>
                )}
                {summaryError && <Alert variant="danger">{summaryError}</Alert>}
                {!loadingSummary && !summaryError && summary && (
                  // Add some padding/margin for better readability inside the card
                  <div className="ai-summary-markdown p-2">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                    <p className="text-muted small mt-3">
                      Section generated by AI. Double-check important
                      information.
                    </p>{" "}
                    {/* ADDED Disclaimer */}
                  </div>
                )}
                {!loadingSummary && !summaryError && !summary && (
                  <p>AI summary could not be generated.</p>
                )}
              </Card.Body>
            </Card>
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="mt-3"
            >
              &larr; Back to Form
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
