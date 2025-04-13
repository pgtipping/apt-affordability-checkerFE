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

  // Query RentCast API
  const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY;
  if (!RENTCAST_API_KEY) {
    res.status(500).json({ error: "RentCast API key not configured." });
    return;
  }

  try {
    // RentCast API: https://developers.rentcast.io/reference/market-data
    const params = new URLSearchParams({
      zipCode: zipCode,
      // Optionally add history=true or specific property types if needed
      // propertyType: 'Single Family', // Example
      // history: 'true' // Example
    });
    const rentcastRes = await fetch(
      `https://api.rentcast.io/v1/markets?${params.toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-Api-Key": RENTCAST_API_KEY,
        },
      }
    );

    if (!rentcastRes.ok) {
      const errorText = await rentcastRes.text();
      res.status(502).json({ error: "RentCast API error", details: errorText });
      return;
    }

    const data = await rentcastRes.json();
    // Temporary log to inspect RentCast response structure
    // Temporary log removed

    // Extract relevant average rent data (adjust based on actual response structure)
    // Example: Assuming response has averageRentByBedrooms or similar
    // Let's assume we want the average for a 1-bedroom for simplicity
    // Extract relevant rent data (adjust based on actual response structure)
    // Attempt to find values at top level or within the first array element
    const averageRent = data?.averageRent || data?.[0]?.averageRent || null;
    const lowRent = data?.lowRent || data?.[0]?.lowRent || null;
    const highRent = data?.highRent || data?.[0]?.highRent || null;

    res.status(200).json({
      averageRent: averageRent,
      lowRent: lowRent, // Return low rent if available
      highRent: highRent, // Return high rent if available
      source: "RentCast Market Data",
      zipCode: zipCode,
    });
  } catch (err) {
    console.error("RentCast Market API Error:", err);
    res.status(500).json({
      error: "Internal server error fetching market data",
      details: err.message,
    });
  }
}
