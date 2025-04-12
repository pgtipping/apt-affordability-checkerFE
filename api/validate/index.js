export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    movingAndSetupCost,
    monthlyLivingCost,
    rent,
    securityDeposit,
    totalMonthlyIncome,
    totalSavings,
    monthsToEvaluate,
    location,
  } = req.body || {};

  // Basic validation (client does main calculations)
  const errors = {};

  if (!location || typeof location !== "string" || location.trim().length < 5) {
    errors.location = "Please enter a valid address (at least 5 characters).";
  }
  const numericFields = [
    "movingAndSetupCost",
    "monthlyLivingCost",
    "rent",
    "securityDeposit",
    "totalMonthlyIncome",
    "totalSavings",
    "monthsToEvaluate",
  ];
  numericFields.forEach((field) => {
    const value = req.body?.[field];
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      isNaN(Number(value)) ||
      Number(value) < 0
    ) {
      errors[field] = `${field} must be a valid positive number.`;
    }
  });
  if (
    !errors.rent &&
    !errors.totalMonthlyIncome &&
    Number(rent) > Number(totalMonthlyIncome)
  ) {
    errors.rent = "Monthly Rent should not exceed Total Monthly Income.";
  }
  if (
    !errors.securityDeposit &&
    !errors.rent &&
    Number(securityDeposit) > 12 * Number(rent)
  ) {
    errors.securityDeposit =
      "Security Deposit should not exceed 12 months of rent.";
  }
  if (
    !errors.monthsToEvaluate &&
    (Number(monthsToEvaluate) < 1 || Number(monthsToEvaluate) > 60)
  ) {
    errors.monthsToEvaluate = "Months to Evaluate must be between 1 and 60.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If valid, return success (calculations are client-side)
  return res.status(200).json({ success: true });
}
