import React from "react";
import {
  InputGroup,
  FormControl,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { useFormContext } from "../../context/FormContext";

function RentEstimateInput({ onInputChange }) {
  const { formData, formErrors } = useFormContext();

  const renderTooltip = (props) => (
    <Tooltip id="rent-tooltip" {...props}>
      {formData.rentEstimates
        ? "Based on estimates for your location"
        : "Enter your monthly rent amount"}
    </Tooltip>
  );

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: "170px" }}>
        {formData.rentEstimates ? "Suggested Rent" : "Monthly Rent"}
      </InputGroup.Text>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <FormControl
          id="rent"
          placeholder={
            formData.rentEstimates
              ? "Based on location estimates"
              : "Enter monthly rent"
          }
          type="number"
          value={formData.rent}
          onChange={(e) => onInputChange("rent", e.target.value)}
          isInvalid={!!formErrors.rentError}
          readOnly={!!formData.rentEstimates}
        />
      </OverlayTrigger>
      {formData.rentEstimates && (
        <Button
          variant="outline-secondary"
          onClick={() => onInputChange("rent", "")}
        >
          Clear
        </Button>
      )}
      <FormControl.Feedback type="invalid">
        {formErrors.rentError}
      </FormControl.Feedback>
    </InputGroup>
  );
}

export default RentEstimateInput;
