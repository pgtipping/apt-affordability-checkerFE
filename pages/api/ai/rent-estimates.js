export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  // Expecting zipCode in the body now, not address/bedrooms etc.
  const { zipCode } = req.body || {};

  // Basic input validation for zipCode
  if (!zipCode || typeof zipCode !== "string" || !/^\d{5}$/.test(zipCode)) {
    res.status(400).json({
      error:
        "Missing or invalid zipCode field. Please provide a 5-digit ZIP code.",
    });
    return;
  }

  // ZORI CSV lookup logic will be inserted here.
  try {
    // Dynamically import the ZORI lookup utility
    const { getRentByZip } = require("../../../src/utils/zoriLookup");
    const result = getRentByZip(zipCode);

    res.status(200).json({
      averageRent: result.rent,
      lowRent: null,
      highRent: null,
      source: result.source,
      zipCode: result.zip,
      month: result.month,
    });
  } catch (err) {
    console.error("ZORI Rent Lookup Error:", err);
    res.status(500).json({
      error: "Internal server error fetching rent estimate from ZORI",
      details: err.message,
    });
  }
}
