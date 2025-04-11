import axios from "axios";

export async function geocodeAddress(address) {
  const apiKey = process.env.MAPBOX_API_KEY;
  if (!apiKey) {
    throw new Error("MAPBOX_API_KEY is not set in the environment.");
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.features && response.data.features.length > 0) {
      // [longitude, latitude]
      return response.data.features[0].center;
    }
    throw new Error("No results found for address");
  } catch (error) {
    throw new Error(
      "Geocoding failed: " +
        (error.response?.data?.message || error.message || "Unknown error")
    );
  }
}
