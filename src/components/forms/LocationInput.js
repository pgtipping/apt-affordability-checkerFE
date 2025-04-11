import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function LocationInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="location-tooltip" {...props}>
      Enter city or ZIP code to get rent estimates
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>Location</InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="location"
          placeholder="Enter city or ZIP"
          value={formData.location}
          onChange={(e) => onInputChange("location", e.target.value)}
          isInvalid={!!formErrors.locationError}
        />
      </OverlayTrigger>
      <FormControl.Feedback type="invalid">
        {formErrors.locationError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default LocationInput;
