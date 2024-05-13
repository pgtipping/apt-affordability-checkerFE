import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function UtilitiesInput() {
  const { formData, formErrors, handleInputChange } = useFormContext();

  const renderTooltip = (tooltipText) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ minWidth: "162px" }}>Utilities</InputGroup.Text>
      <OverlayTrigger
        placement="top"
        overlay={renderTooltip(
          "Average monthly cost for utilities like gas, sewer, water, etc."
        )}
      >
        <FormControl
          id="utilities"
          placeholder="Estimated monthly utilities"
          type="number"
          value={formData.utilities}
          onChange={(e) => handleInputChange("utilities", e.target.value)}
          isInvalid={!!formErrors.utilitiesError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.utilitiesError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default UtilitiesInput;
