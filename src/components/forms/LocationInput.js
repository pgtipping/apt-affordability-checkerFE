import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Form, // Import Form
} from "react-bootstrap";
import { useFormContext } from "@/context/FormContext";
import styles from "../FormComponent.module.css";

function LocationInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="location-tooltip" {...props}>
      Enter city or ZIP code to get rent estimates
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="location" className="visually-hidden">
        Location
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Location
        </InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="location"
            placeholder="Enter city or ZIP code"
            value={formData.location}
            onChange={(e) => onInputChange("location", e.target.value)}
            isInvalid={!!formErrors.locationError}
          />
        </OverlayTrigger>
        <FormControl.Feedback type="invalid">
          {formErrors.locationError}
        </FormControl.Feedback>
      </InputGroup>
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.locationError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default LocationInput;
