import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function MovingAndSetupCostInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="moving-setup-cost-tooltip" {...props}>
      Includes moving fees and initial setup costs like furniture, appliances,
      etc.
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "178px" }}>
        Moving & Setup Cost
      </InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="moving-setup-cost"
          placeholder="Enter moving and setup costs"
          type="number"
          value={formData.movingAndSetupCost}
          onChange={(e) => onInputChange("movingAndSetupCost", e.target.value)}
          isInvalid={!!formErrors.movingAndSetupCostError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.movingAndSetupCostError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default MovingAndSetupCostInput;
