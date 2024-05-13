import React from "react";
import { Tooltip, OverlayTrigger, Form } from "react-bootstrap";

const CustomInput = ({
  id,
  label,
  placeholder,
  tooltipText,
  type = "number",
  value,
  onChange,
  error,
}) => {
  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${id}`} {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <OverlayTrigger placement="right" overlay={renderTooltip}>
        <div>
          <Form.Control
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isInvalid={!!error} // Bootstrap uses isInvalid prop to display validation feedback
          />
        </div>
      </OverlayTrigger>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomInput;
