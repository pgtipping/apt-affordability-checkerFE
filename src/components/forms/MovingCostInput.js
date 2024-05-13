import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MovingCostInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Moving Cost
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip("Include all costs associated with moving.")}
      >
        <FormControl
          id="moving-cost"
          placeholder="Enter total moving cost"
          type="number"
          value={formData.movingCost}
          onChange={(e) => handleInputChange("movingCost", e.target.value)}
          isInvalid={!!formErrors.movingCostError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.movingCostError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default MovingCostInput;
