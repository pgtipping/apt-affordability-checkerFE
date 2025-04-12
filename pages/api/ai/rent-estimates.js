module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const { address, bedrooms, bathrooms, sqft } = req.body || {};

  // Basic input validation
  if (
    !address ||
    typeof address !== "string" ||
    !bedrooms ||
    !bathrooms ||
    !sqft
  ) {
    res.status(400).json({ error: "Missing or invalid input fields." });
    return;
  }

  // Integrate with LocationService.js for real geocoding
  let geocoded = {
    lat: 40.7128,
    lng: -74.006,
    formattedAddress: address,
  };
  try {
    // Dynamically import LocationService (ESM in Node.js)
    const { geocodeAddress } = await import(
      "../../src/services/LocationService.js"
    );
    const [lng, lat] = await geocodeAddress(address);
    geocoded = {
      lat,
      lng,
      formattedAddress: address,
    };
  } catch (geoError) {
    // If geocoding fails, fallback to placeholder and log error
    console.error("Geocoding failed:", geoError.message);
  }

  // Query RentCast API
  const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY;
  if (!RENTCAST_API_KEY) {
    res.status(500).json({ error: "RentCast API key not configured." });
    return;
  }

  try {
    // RentCast API: https://developers.rentcast.io/reference/property-rent-estimates
    const rentcastRes = await fetch(
      "https://api.rentcast.io/v1/properties/rent-estimate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": RENTCAST_API_KEY,
        },
        body: JSON.stringify({
          address: geocoded.formattedAddress,
          bedrooms,
          bathrooms,
          squareFootage: sqft,
          latitude: geocoded.lat,
          longitude: geocoded.lng,
        }),
      }
    );

    if (!rentcastRes.ok) {
      const errorText = await rentcastRes.text();
      res.status(502).json({ error: "RentCast API error", details: errorText });
      return;
    }

    const data = await rentcastRes.json();

    // Map RentCast response to our API contract
    res.status(200).json({
      estimatedRent: data.rent || null,
      confidence: data.confidenceScore || null,
      source: "RentCast",
      details: {
        address: geocoded.formattedAddress,
        bedrooms,
        bathrooms,
        sqft,
        latitude: geocoded.lat,
        longitude: geocoded.lng,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};
