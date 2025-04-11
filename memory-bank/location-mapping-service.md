# Location Mapping Service Plan

## Purpose

Enable address and place name geocoding to latitude/longitude for use in rent estimation and other features in the Apartment Cost Analyzer.

## Requirements

- Convert user-provided addresses or place names to latitude/longitude coordinates.
- Integrate with AIService.js and other backend endpoints as needed.
- Support error handling for failed or ambiguous geocoding.
- Ensure compliance with privacy and data security standards.
- Use environment variables for API keys.

## Provider Options

1. **Google Maps Geocoding API**

   - Pros: Highly accurate, global coverage, robust documentation.
   - Cons: Requires billing setup, usage limits, not open source.

2. **Mapbox Geocoding API**

   - Pros: Good accuracy, generous free tier, easy integration.
   - Cons: Usage limits, requires API key.

3. **OpenStreetMap (Nominatim)**
   - Pros: Free, open source, no API key required for low-volume use.
   - Cons: Rate limits, less robust for production-scale apps.

## Recommended Approach

- **Provider:** Mapbox Geocoding API (best balance of ease, cost, and reliability for this project).
- **Integration:**
  - Create a new service module: `src/services/LocationService.js`
  - Use the Mapbox Geocoding API to convert addresses to coordinates.
  - Store the API key in an environment variable: `MAPBOX_API_KEY`
  - Add error handling for failed lookups and ambiguous results.

## Implementation Steps

1. Register for a Mapbox account: https://account.mapbox.com/auth/signup/
2. Obtain a Mapbox API access token.
3. Add `MAPBOX_API_KEY` to Vercel and local `.env` file.
4. Implement `LocationService.js` with a function to geocode addresses.
5. Update AIService.js and any relevant components to use the new service.
6. Document usage and update the memory bank.

## Example Usage

```js
// src/services/LocationService.js
import axios from "axios";

export async function geocodeAddress(address) {
  const apiKey = process.env.MAPBOX_API_KEY;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}`;
  const response = await axios.get(url);
  if (response.data.features && response.data.features.length > 0) {
    return response.data.features[0].center; // [longitude, latitude]
  }
  throw new Error("No results found for address");
}
```

## Status

- [ ] Mapbox account created
- [ ] API key obtained and configured
- [ ] LocationService.js implemented
- [ ] AIService.js updated to use LocationService
- [ ] Documentation updated

_Last updated: 2025-04-11 16:09 EDT_
