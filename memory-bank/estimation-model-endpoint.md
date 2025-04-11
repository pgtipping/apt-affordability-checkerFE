# Estimation Model Endpoint Plan

## Purpose

Provide a serverless API endpoint to generate rent estimates based on user input (location, property details, etc.) using integrated data sources (e.g., Zillow API, geocoding).

## Requirements

- Accept POST requests with location and property details (e.g., address, bedrooms, bathrooms, square footage).
- Use the location mapping service to geocode addresses.
- Query Zillow API (and/or other sources) for rent estimate data.
- Return a structured JSON response with estimated rent and confidence metrics.
- Handle errors gracefully (invalid input, API failures, etc.).
- Secure API credentials using environment variables.

## Endpoint Specification

- **Path:** `/api/ai/rent-estimates`
- **Method:** POST
- **Request Body Example:**
  ```json
  {
    "address": "123 Main St, Anytown, USA",
    "bedrooms": 2,
    "bathrooms": 1,
    "sqft": 900
  }
  ```
- **Response Example:**
  ```json
  {
    "estimatedRent": 1850,
    "confidence": 0.87,
    "source": "Zillow",
    "details": {
      "address": "123 Main St, Anytown, USA",
      "bedrooms": 2,
      "bathrooms": 1,
      "sqft": 900
    }
  }
  ```

## Implementation Steps

1. Create `/api/ai/rent-estimates.js` serverless function.
2. Validate and parse request body.
3. Use `LocationService.js` to geocode the address.
4. Query Zillow API for rent estimate using geocoded location and property details.
5. Format and return the response.
6. Add error handling for all external API calls and input validation.
7. Securely access API keys via environment variables.
8. Write unit and integration tests for the endpoint.
9. Update AIService.js to call the new endpoint.

## Status

- [ ] Endpoint implemented
- [ ] Integrated with LocationService
- [ ] Zillow API integration complete
- [ ] Tests written
- [ ] Documentation updated

_Last updated: 2025-04-11 16:10 EDT_
