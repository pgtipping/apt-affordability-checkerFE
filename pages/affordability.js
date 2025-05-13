import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import FormComponent from "@/components/FormComponent";
import ScenarioPlannerPage from "./scenario-planner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";
import styles from "@/components/FormComponent.module.css";

export default function AffordabilityUnified() {
  const [darkMode, setDarkMode] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark-mode");
  };

  return (
    <div className={`${styles["page-container"]} ${darkMode ? styles["dark-mode"] : ""}`}>    
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onFeedbackClick={() => setShowFeedbackForm(true)}
      />
      <div className={styles["blog-intro"] + " mb-4 mt-3"}>
        <Container className={styles["content-wrap"]}>
          <h1 className="m-0 mb-3">Apartment Affordability Checker</h1>
          <p>
            Welcome to the Apartment Affordability Checker, a comprehensive web application designed to help users evaluate their ability to afford a new apartment. It evaluates cost associated with moving and living in the new apartment and your overall earnings. Features include real-time calculations, light/dark mode, and user feedback.
          </p>
        </Container>
      </div>
      <main>
        <Container className={styles["content-wrap"] + " mt-6"}>
          <Tabs defaultActiveKey="calculator" id="affordability-tabs" className="mb-4">
            <Tab eventKey="calculator" title="Affordability Calculator">
              <FormComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Tab>
            <Tab eventKey="scenario" title="Scenario Planner">
              <ScenarioPlannerPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Tab>
          </Tabs>
        </Container>
      </main>
      {mounted && (
        <FeedbackForm
          darkMode={darkMode}
          show={showFeedbackForm}
          setShow={setShowFeedbackForm}
        />
      )}
      <Footer />
    </div>
  );
}

