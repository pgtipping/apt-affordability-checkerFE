import React from "react";
import { FormProvider } from "./context/FormContext";
import { ScenarioProvider } from "./context/ScenarioContext.js";
import FormComponent from "./components/FormComponent"; // Import the new form component
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ScenarioProvider>
      <FormProvider>
        <div className="mt-5">
          <FormComponent />
        </div>
      </FormProvider>
    </ScenarioProvider>
  );
}

export default App;
