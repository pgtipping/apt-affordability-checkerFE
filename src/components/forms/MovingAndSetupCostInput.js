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

function MovingAndSetupCostInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="moving-setup-cost-tooltip" {...props}>
      Includes moving fees and initial setup costs like furniture, appliances,
      etc.
    </Tooltip>
  );

  return (
    // Add Form.Label for accessibility, visually hidden to keep InputGroup.Text look
    <Form.Group className="mb-3">
      <Form.Label htmlFor="moving-setup-cost" className="visually-hidden">
        Moving & Setup Cost
      </Form.Label>
      <InputGroup>
        {/* Remove fixed width style */}
        <InputGroup.Text className={styles["form-label-uniform"]}>
          Moving & Setup Cost
        </InputGroup.Text>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <FormControl
            id="moving-setup-cost"
            placeholder="Enter moving and setup costs"
            type="number"
            value={formData.movingAndSetupCost}
            onChange={(e) =>
              onInputChange("movingAndSetupCost", e.target.value)
            }
            isInvalid={!!formErrors.movingAndSetupCostError}
          />
        </OverlayTrigger>
        <FormControl.Feedback type="invalid">
          {formErrors.movingAndSetupCostError}
        </FormControl.Feedback>
      </InputGroup>
      {/* Keep Feedback outside InputGroup but inside Form.Group */}
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {formErrors.movingAndSetupCostError}
      </FormControl.Feedback>
    </Form.Group>
  );
}

export default MovingAndSetupCostInput;
