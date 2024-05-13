import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function OtherMonthlyExpensesInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Other Expenses
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Total for groceries, insurance, wardrobe, etc."
        )}
      >
        <FormControl
          id="other-expenses"
          placeholder="Enter other monthly expenses"
          type="number"
          value={formData.otherExpenses}
          onChange={(e) => handleInputChange("otherExpenses", e.target.value)}
          isInvalid={!!formErrors.otherExpensesError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.otherExpensesError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default OtherMonthlyExpensesInput;
