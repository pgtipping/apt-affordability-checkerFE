import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function TotalMonthlyIncomeInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="total-monthly-income-tooltip" {...props}>
      Monthly household income from all sources after deductions for tax, 401k,
      savings, etc.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>
        Monthly Income
      </InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="total-monthly-income"
          placeholder="Enter total monthly income"
          type="number"
          value={formData.totalMonthlyIncome}
          onChange={(e) => onInputChange("totalMonthlyIncome", e.target.value)}
          isInvalid={!!formErrors.totalMonthlyIncomeError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.totalMonthlyIncomeError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default TotalMonthlyIncomeInput;
