"use client";
import React, { useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";

export const ScenarioForm = ({ initial, onSubmit, onCancel }) => {
  const [type, setType] = useState(initial?.type || "income");
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [startDate, setStartDate] = useState(initial?.startDate || "");
  const [description, setDescription] = useState(initial?.description || "");

  useEffect(() => {
    if (initial) {
      setType(initial.type);
      setAmount(initial.amount.toString());
      setStartDate(initial.startDate);
      setDescription(initial.description);
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || !startDate) return;
    onSubmit({
      ...(initial?.id ? { id: initial.id } : {}),
      type,
      amount: Number(amount),
      startDate,
      description,
    });
    setAmount("");
    setStartDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <div className="flex gap-2">
        <Form.Select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-32"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Select>
        <Form.Control
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-32"
          min={0}
          step={1}
        />
        <Form.Control
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-40"
        />
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-48"
        />
        <Button type="submit" size="sm" variant="default">
          {initial ? "Update" : "Add"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
