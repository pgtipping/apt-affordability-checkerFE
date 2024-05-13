import React from "react";
import { FormProvider } from "./context/FormContext";
import FormComponent from "./components/FormComponent"; // Import the new form component
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <FormProvider>
      <div className="container mt-5">
        <FormComponent />
      </div>
    </FormProvider>
  );
}

export default App;
