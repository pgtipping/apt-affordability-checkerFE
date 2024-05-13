import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function TotalSavingsInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Total Savings
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Cash at bank plus near cash investments (can be converted to cash within 30 days)."
        )}
      >
        <FormControl
          id="savings"
          placeholder="Enter total savings"
          type="number"
          value={formData.savings}
          onChange={(e) => handleInputChange("savings", e.target.value)}
          isInvalid={!!formErrors.savingsError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.savingsError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default TotalSavingsInput;
