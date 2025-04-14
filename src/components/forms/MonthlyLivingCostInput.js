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

function MonthlyLivingCostInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="monthly-living-cost-tooltip" {...props}>
      Combines utilities, other monthly expenses, and debt payments.
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="monthly-living-cost" className="visually-hidden">
        Monthly Living Costs
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Monthly Living Costs
        </InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="monthly-living-cost"
            placeholder="Enter total monthly living costs"
            type="number"
            value={formData.monthlyLivingCost}
            onChange={(e) => onInputChange("monthlyLivingCost", e.target.value)}
            isInvalid={!!formErrors.monthlyLivingCostError}
          />
        </OverlayTrigger>
        <FormControl.Feedback type="invalid">
          {formErrors.monthlyLivingCostError}
        </FormControl.Feedback>
      </InputGroup>
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.monthlyLivingCostError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default MonthlyLivingCostInput;
