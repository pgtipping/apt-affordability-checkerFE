import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button, Form, Container, Row, Col, Card, Table } from "react-bootstrap";
import Link from "next/link";

export default function ScenarioPlannerPage({ darkMode, toggleDarkMode }) {
  // Local state for gross income only (per Ramit Sethi 28% rule)
  const [grossIncome, setGrossIncome] = useState("");

  // Scenario state
  const [scenarios, setScenarios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [scenarioForm, setScenarioForm] = useState({
    type: "income",
    amount: "",
    startDate: "",
    description: "",
  });

  // Handle scenario form changes
  const handleFormChange = (e) => {
    setScenarioForm({ ...scenarioForm, [e.target.name]: e.target.value });
  };

  // Add or update scenario
  const handleScenarioSubmit = (e) => {
    e.preventDefault();
    if (!scenarioForm.amount || isNaN(Number(scenarioForm.amount)) || !scenarioForm.startDate) return;
    if (editing) {
      setScenarios(scenarios.map(s => s.id === editing.id ? { ...scenarioForm, id: editing.id, amount: Number(scenarioForm.amount) } : s));
      setEditing(null);
    } else {
      setScenarios([...scenarios, { ...scenarioForm, id: nanoid(), amount: Number(scenarioForm.amount) }]);
    }
    setScenarioForm({ type: "income", amount: "", startDate: "", description: "" });
  };

  // Edit scenario
  const handleEdit = (scenario) => {
    setEditing(scenario);
    setScenarioForm({ ...scenario, amount: scenario.amount.toString() });
  };

  // Remove scenario
  const handleRemove = (id) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    if (editing && editing.id === id) {
      setEditing(null);
      setScenarioForm({ type: "income", amount: "", startDate: "", description: "" });
    }
  };

  // Add preview date state
  const [previewDate, setPreviewDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10); // yyyy-mm-dd
  });

  // Calculate scenario results as of previewDate
  const baseGrossIncome = Number(grossIncome) || 0;
  let scenarioGrossIncome = baseGrossIncome;
  const preview = new Date(previewDate);
  scenarios.forEach(event => {
    if (new Date(event.startDate) <= preview) {
      if (event.type === "income") scenarioGrossIncome += event.amount;
      // No expense deduction per 28% rule
    }
  });
  const currentMaxRent = Math.max(0, baseGrossIncome * 0.28);
  const scenarioMaxRent = Math.max(0, scenarioGrossIncome * 0.28);
  const delta = scenarioMaxRent - currentMaxRent;

  return (
    <div className={`page-container ${darkMode ? 'dark-mode' : ''}`}> 
      <main>
        <Container className="content-wrap mt-6" style={{ maxWidth: 800 }}>
          <Card className="mb-4 shadow-sm"> 
            <Card.Body>
              <Card.Title as="h2" className="mb-3">Scenario Planning</Card.Title>
              <Form onSubmit={handleScenarioSubmit} className="mb-4">
                <Row className="g-2">
                  <Col md={3} xs={6}>
                    <Form.Select
                      name="type"
                      value={scenarioForm.type}
                      onChange={handleFormChange}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </Form.Select>
                  </Col>
                  <Col md={3} xs={6}>
                    <Form.Control
                      type="number"
                      name="amount"
                      min={0}
                      value={scenarioForm.amount}
                      onChange={handleFormChange}
                      placeholder="Amount"
                      required
                    />
                  </Col>
                  <Col md={3} xs={6}>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={scenarioForm.startDate}
                      onChange={handleFormChange}
                      required
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <Form.Control
                      type="text"
                      name="description"
                      value={scenarioForm.description}
                      onChange={handleFormChange}
                      placeholder="Description"
                    />
                  </Col>
                </Row>
                <div className="mt-2">
                  <Button type="submit" size="sm" className={`me-2 ${darkMode ? 'btn-dark' : 'btn-primary'}`}>{editing ? "Update" : "Add"}</Button>
                  {editing && (
                    <Button type="button" size="sm" variant={darkMode ? 'outline-light' : 'outline-secondary'} onClick={() => { setEditing(null); setScenarioForm({ type: "income", amount: "", startDate: "", description: "" }); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
              <div className="mb-2 fw-semibold">Scenario Events</div>
               {scenarios.length === 0 ? (
                <div className="text-muted mb-3">No scenarios added yet.</div>
              ) : (
                <Table size="sm" bordered hover responsive className="mb-4">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map(event => (
                      <tr key={event.id}>
                        <td>{event.type === "income" ? "Income" : "Expense"}</td>
                        <td>${event.amount.toLocaleString()}</td>
                        <td>{event.startDate}</td>
                        <td>{event.description}</td>
                        <td>
                          <Button size="sm" variant="outline-secondary" className="me-1" onClick={() => handleEdit(event)}>Edit</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => handleRemove(event.id)}>Remove</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {/* Results Section */}
              <div className="fw-semibold mb-2 mt-4">Results</div>
              <div className="mb-2 text-muted" style={{ fontSize: '0.98em' }}>
                <b>How is this calculated?</b> All scenario events with a start date on or before <b>{previewDate}</b> are included. Events after this date are ignored. <b>You can afford up to 28% of your gross income on rent</b> (per <a href='https://www.iwillteachyoutoberich.com/blog/the-2836-rule/' target='_blank' rel='noopener noreferrer'>Ramit Sethi’s 28/36 rule</a>).
              </div>
              <div className="mb-2">
                <span>Current Max Rent: <b>${currentMaxRent.toLocaleString()}</b></span><br />
                <span>Scenario Max Rent (as of {previewDate}): <b>${scenarioMaxRent.toLocaleString()}</b></span><br />
                <span className="text-muted-foreground">
                  {delta > 0 && `With your planned changes, your affordable rent increases by $${delta.toLocaleString()}/month.`}
                  {delta < 0 && `With your planned changes, your affordable rent decreases by $${Math.abs(delta).toLocaleString()}/month.`}
                  {delta === 0 && "This scenario does not change your affordable rent."}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
}
