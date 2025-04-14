import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Button, // Keep Button if needed elsewhere, but Form is needed now
  Form, // Import Form
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
    // Add Form.Label for accessibility, visually hidden
    <Form.Group className="mb-3">
      <Form.Label htmlFor="rent" className="visually-hidden">
        Monthly Rent
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Monthly Rent
        </InputGroup.Text>
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
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.rentError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default RentEstimateInput;
