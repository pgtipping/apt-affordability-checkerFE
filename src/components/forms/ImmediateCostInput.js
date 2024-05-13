import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function ImmediateCostInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Immediate Cost
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Include costs of immediate necessities like furniture, appliances, etc."
        )}
      >
        <FormControl
          id="immediate-cost"
          placeholder="Enter total immediate cost"
          type="number"
          value={formData.immediateCost}
          onChange={(e) => handleInputChange("immediateCost", e.target.value)}
          isInvalid={!!formErrors.immediateCostError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.immediateCostError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default ImmediateCostInput;
