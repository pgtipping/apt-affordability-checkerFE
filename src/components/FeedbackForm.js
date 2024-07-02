import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import "./FeedbackForm.css";
import { Modal, Button, Form } from "react-bootstrap";

const FeedbackForm = ({ darkMode }) => {
  const { handleFeedbackSubmit, setShowFeedbackForm } = useFormContext();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFeedbackSubmit(feedback);
  };

  return (
    <Modal show={true} onHide={() => setShowFeedbackForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter your feedback here:</Form.Label>
            <Form.Control
              as="textarea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant={darkMode ? "dark" : "primary"}
            type="submit"
            className="mt-3"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackForm;
