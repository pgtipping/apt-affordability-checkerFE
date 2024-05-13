import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function SecurityDepositInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Security Deposit
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Deposit (in addition to rent) required before moving in."
        )}
      >
        <FormControl
          id="security-deposit"
          placeholder="Enter security deposit amount"
          type="number"
          value={formData.securityDeposit}
          onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
          isInvalid={!!formErrors.securityDepositError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.securityDepositError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default SecurityDepositInput;
