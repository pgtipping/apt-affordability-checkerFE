import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function NetHouseholdIncomeInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Net Income
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Total household income after taxes and deductions."
        )}
      >
        <FormControl
          id="net-income"
          placeholder="Enter net monthly income"
          type="number"
          value={formData.netIncome}
          onChange={(e) => handleInputChange("netIncome", e.target.value)}
          isInvalid={!!formErrors.netIncomeError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.netIncomeError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default NetHouseholdIncomeInput;
