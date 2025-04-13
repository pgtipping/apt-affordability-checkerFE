import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Form, // Import Form
} from "react-bootstrap";
import { useFormContext } from "@/context/FormContext";

function MonthsToEvaluateInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="months-to-evaluate-tooltip" {...props}>
      Duration to calculate the affordability of the new apartment.
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="months-to-evaluate" className="visually-hidden">
        Months to Evaluate
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text>Months to Evaluate</InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="months-to-evaluate"
            placeholder="Enter number of months to evaluate affordability"
            type="number"
            value={formData.monthsToEvaluate}
            onChange={(e) => onInputChange("monthsToEvaluate", e.target.value)}
            isInvalid={!!formErrors.monthsToEvaluateError}
          />
        </OverlayTrigger>
        <FormControl.Feedback type="invalid">
          {formErrors.monthsToEvaluateError}
        </FormControl.Feedback>
      </InputGroup>
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.monthsToEvaluateError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default MonthsToEvaluateInput;
