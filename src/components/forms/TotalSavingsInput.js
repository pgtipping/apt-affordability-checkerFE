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

function TotalSavingsInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="total-savings-tooltip" {...props}>
      Cash at bank plus near cash investments (can be converted to cash within
      30 days).
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="total-savings" className="visually-hidden">
        Total Savings
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Total Savings
        </InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="total-savings"
            placeholder="total savings"
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
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.totalSavingsError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default TotalSavingsInput;
