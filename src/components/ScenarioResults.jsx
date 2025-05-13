"use client";
import React from "react";
import { useScenarioContext } from "../context/ScenarioContext.js";
import { applyScenariosToState } from "../utils/scenarioCalculator.js";

const baseline = { netIncome: 5000, expenses: 2000 };

export const ScenarioResults = () => {
  const { state } = useScenarioContext();
  const [asOfDate, setAsOfDate] = React.useState(null);

  React.useEffect(() => {
    setAsOfDate(new Date());
  }, []);

  if (!asOfDate) return null; // or a loading spinner

  const scenarioResult = applyScenariosToState(baseline, state.scenarios, asOfDate);
  const delta = scenarioResult.maxRent - ((baseline.netIncome - baseline.expenses) * 0.3);
  return (
    <div className="mt-4 border-t pt-4">
      <div className="font-semibold">Results</div>
      <div className="flex flex-col gap-1 text-sm">
        <span>Current Max Rent: <b>${((baseline.netIncome - baseline.expenses) * 0.3).toLocaleString()}</b></span>
        <span>Scenario Max Rent: <b>${scenarioResult.maxRent.toLocaleString()}</b></span>
        <span className="text-muted-foreground">
          {delta > 0 && `With your planned changes, your affordable rent increases by $${delta.toLocaleString()}/month.`}
          {delta < 0 && `With your planned changes, your affordable rent decreases by $${Math.abs(delta).toLocaleString()}/month.`}
          {delta === 0 && "This scenario does not change your affordable rent."}
        </span>
      </div>
    </div>
  );
};
