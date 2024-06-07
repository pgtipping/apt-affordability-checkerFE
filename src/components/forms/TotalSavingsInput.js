import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function TotalSavingsInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="total-savings-tooltip" {...props}>
      Cash at bank plus near cash investments (can be converted to cash within
      30 days).
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "178px" }}>
        Total Savings
      </InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="total-savings"
          placeholder="Enter total savings"
          type="number"
          value={formData.totalSavings}
          onChange={(e) => onInputChange("totalSavings", e.target.value)}
          isInvalid={!!formErrors.totalSavingsError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.totalSavingsError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default TotalSavingsInput;
