import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MonthlyRentInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="monthly-rent-tooltip" {...props}>
      Monthly rent amount.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>Monthly Rent</InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="monthly-rent"
          placeholder="Enter monthly rent"
          type="number"
          value={formData.rent}
          onChange={(e) => onInputChange("rent", e.target.value)}
          isInvalid={!!formErrors.rentError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.rentError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default MonthlyRentInput;
