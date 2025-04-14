import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Form, // Import Form
} from "react-bootstrap";
import { useFormContext } from "@/context/FormContext";
import styles from "../FormComponent.module.css";

function SecurityDepositInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="security-deposit-tooltip" {...props}>
      Typically the same as one month's rent, but can be adjusted.
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="security-deposit" className="visually-hidden">
        Security Deposit
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
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
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.securityDepositError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default SecurityDepositInput;
