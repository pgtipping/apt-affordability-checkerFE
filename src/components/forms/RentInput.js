import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function RentInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Monthly Rent
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip("Monthly rental amount.")}
      >
        <FormControl
          id="rent"
          placeholder="Enter monthly rent"
          type="number"
          value={formData.rent}
          onChange={(e) => handleInputChange("rent", e.target.value)}
          isInvalid={!!formErrors.rentError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.rentError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default RentInput;
