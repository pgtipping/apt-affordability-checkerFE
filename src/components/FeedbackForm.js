import React, { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { Modal, Button, Form } from "react-bootstrap";

const FeedbackForm = ({ darkMode, show, setShow }) => {
  const { handleFeedbackSubmit } = useFormContext();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFeedbackSubmit(feedback);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>What improvements will you like to see?</Form.Label>
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
