import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function AssociatedCostInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>
        Associated Costs
      </InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Include pet fees, parking fees, estimated monthly transportation expenses, etc."
        )}
      >
        <FormControl
          id="associated-cost"
          placeholder="Enter total associated costs"
          type="number"
          value={formData.associatedCost}
          onChange={(e) => handleInputChange("associatedCost", e.target.value)}
          isInvalid={!!formErrors.associatedCostError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.associatedCostError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default AssociatedCostInput;
