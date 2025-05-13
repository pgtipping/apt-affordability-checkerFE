"use client";
import React from "react";

import { Button } from "react-bootstrap";

export const ScenarioList = ({ scenarios, onEdit, onRemove }) => {
  if (!scenarios.length) return <div className="text-muted-foreground text-sm mb-2">No scenarios added yet.</div>;
  return (
    <ul className="space-y-2 mb-2">
      {scenarios.map(event => (
        <li key={event.id} className="flex items-center gap-2 border rounded p-2">
          <span className="font-medium">{event.type === "income" ? "+" : "-"}${event.amount.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{event.startDate}</span>
          <span className="flex-1 text-xs">{event.description}</span>
          <Button size="sm" variant="outline" onClick={() => onEdit(event)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onRemove(event.id)}>Remove</Button>
        </li>
      ))}
    </ul>
  );
};
