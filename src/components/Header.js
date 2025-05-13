import React from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./FormComponent.module.css";

export default function Header({ darkMode, toggleDarkMode, onFeedbackClick }) {
  return (
    <header className={styles["header-bar"] + " py-3 mb-5"}>
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="auto" className="d-flex align-items-center gap-3">
            <div
              className={`${styles["toggle-icon"]}`}
              onClick={toggleDarkMode}
              style={{ cursor: "pointer" }}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <img
                src={darkMode ? "/moon.png" : "/sunny.png"}
                alt={darkMode ? "Dark Mode" : "Light Mode"}
                style={{ width: "40px", transition: "transform 0.5s, opacity 0.5s" }}
              />
            </div>
            {/* Placeholder for login/user icon in future */}
          </Col>
          <Col xs="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="feedback-tooltip">Improvement suggestions & general comments</Tooltip>}>
              <Button
                variant={darkMode ? "outline-light" : "outline-primary"}
                onClick={onFeedbackClick}
                className="fw-semibold"
              >
                Feedback
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
