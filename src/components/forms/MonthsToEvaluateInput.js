import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MonthsToEvaluateInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Months to Evaluate
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Duration to calculate affordability of the new apartment (max 60)."
        )}
      >
        <FormControl
          id="months-to-evaluate"
          placeholder="Enter number of months to evaluate affordability"
          type="number"
          value={formData.monthsToEvaluate}
          onChange={(e) =>
            handleInputChange("monthsToEvaluate", e.target.value)
          }
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
