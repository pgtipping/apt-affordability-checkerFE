import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MonthlySavingsInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Monthly Savings
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip("Amount you save and/or invest monthly")}
      >
        <FormControl
          id="monthly-savings"
          placeholder="Enter your monthly savings & investment amount"
          type="number"
          value={formData.monthlySavings}
          onChange={(e) => handleInputChange("monthlySavings", e.target.value)}
          isInvalid={!!formErrors.monthlySavingsError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.monthlySavingsError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default MonthlySavingsInput;
