import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MonthsToEvaluateInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="months-to-evaluate-tooltip" {...props}>
      Duration to calculate the affordability of the new apartment.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>
        Months to Evaluate
      </InputGroup.Text>
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
  );
}

export default MonthsToEvaluateInput;
