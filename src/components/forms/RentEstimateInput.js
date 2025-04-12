import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { useFormContext } from "@/context/FormContext";

function RentEstimateInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  // Tooltip always shows the same message now
  const renderTooltip = (props) => (
    <Tooltip id="rent-tooltip" {...props}>
      Enter the monthly rent for the apartment you are considering
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>Monthly Rent</InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="rent"
          placeholder="Enter monthly rent"
          type="number"
          value={formData.rent}
          onChange={(e) => onInputChange("rent", e.target.value)}
          isInvalid={!!formErrors.rentError}
          // Removed readOnly attribute
        />
      </OverlayTrigger>
      {/* Removed Clear button */}
      <FormControl.Feedback type="invalid">
        {formErrors.rentError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default RentEstimateInput;
