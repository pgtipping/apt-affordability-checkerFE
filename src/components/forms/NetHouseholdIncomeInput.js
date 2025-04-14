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

function TotalMonthlyIncomeInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="total-monthly-income-tooltip" {...props}>
      Monthly household income from all sources after deductions for tax, 401k,
      savings, etc.
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="total-monthly-income" className="visually-hidden">
        Monthly Income
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Monthly Income
        </InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="total-monthly-income"
            placeholder="Enter total monthly income"
            type="number"
            value={formData.totalMonthlyIncome}
            onChange={(e) =>
              onInputChange("totalMonthlyIncome", e.target.value)
            }
            isInvalid={!!formErrors.totalMonthlyIncomeError}
          />
        </OverlayTrigger>
        <FormControl.Feedback type="invalid">
          {formErrors.totalMonthlyIncomeError}
        </FormControl.Feedback>
      </InputGroup>
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.totalMonthlyIncomeError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default TotalMonthlyIncomeInput;
