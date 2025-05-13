// Scenario event: { id, type: 'income' | 'expense', amount, startDate, description }

export function applyScenariosToState(baseline, scenarios, asOfDate) {
  let netIncome = baseline.netIncome;
  let expenses = baseline.expenses;

  scenarios.forEach(event => {
    if (new Date(event.startDate) <= asOfDate) {
      if (event.type === "income") netIncome += event.amount;
      if (event.type === "expense") expenses += event.amount;
    }
  });

  // Example: 30% rule for max rent
  const maxRent = Math.max(0, (netIncome - expenses) * 0.3);

  return { netIncome, expenses, maxRent };
}
