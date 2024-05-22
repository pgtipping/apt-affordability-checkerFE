import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function SecurityDepositInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="security-deposit-tooltip" {...props}>
      Typically the same as one month's rent, but can be adjusted.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Security Deposit
      </InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="security-deposit"
          placeholder="Enter security deposit amount"
          type="number"
          value={formData.securityDeposit}
          onChange={(e) => onInputChange("securityDeposit", e.target.value)}
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
