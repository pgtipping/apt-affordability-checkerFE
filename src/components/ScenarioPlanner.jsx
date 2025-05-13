"use client";
import React, { useState } from "react";
import { useScenarioContext } from "../context/ScenarioContext.js";
import { nanoid } from "nanoid";
import { Button, Modal } from "react-bootstrap";

import { ScenarioForm } from "./ScenarioForm";
import { ScenarioList } from "./ScenarioList";
import { ScenarioResults } from "./ScenarioResults";

export const ScenarioPlanner = () => {
  const { state, dispatch } = useScenarioContext();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleAdd = (event) => {
    dispatch({ type: "ADD_SCENARIO", payload: { ...event, id: nanoid() } });
    setEditing(null);
  };
  const handleEdit = (event) => {
    dispatch({ type: "EDIT_SCENARIO", payload: event });
    setEditing(null);
  };
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_SCENARIO", payload: id });
  };
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Try Scenario Planning
      </Button>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scenario Planning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScenarioList
            scenarios={state.scenarios}
            onEdit={setEditing}
            onRemove={handleRemove}
          />
          <ScenarioForm
            key={editing?.id || "new"}
            initial={editing}
            onSubmit={editing ? handleEdit : handleAdd}
            onCancel={() => setEditing(null)}
          />
          <ScenarioResults />
        </Modal.Body>
      </Modal>
    </>
  );
};
