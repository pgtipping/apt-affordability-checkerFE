import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MonthlyLivingCostInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="monthly-living-cost-tooltip" {...props}>
      Combines utilities, other monthly expenses, and debt payments.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>
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
  );
}

export default MonthlyLivingCostInput;
