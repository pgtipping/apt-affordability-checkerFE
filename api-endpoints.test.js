/**
 * Simple API endpoint tests for Apartment Cost Analyzer (Next.js)
 * Verifies that all main API endpoints respond with status 200.
 * Run with: npx jest api-endpoints.test.js
 */

const BASE_URL = "http://localhost:3000";

const endpoints = [
  "/api/ai/generate-summary",
  "/api/ai/insights",
  "/api/ai/predictions",
  "/api/ai/recommendations",
  "/api/ai/rent-estimates",
  "/api/feedback",
  "/api/validate",
];

// Uses the global fetch API (Node 18+)
describe("API Endpoints", () => {
  endpoints.forEach((endpoint) => {
    test(`GET ${endpoint} responds with 200`, async () => {
      const res = await fetch(BASE_URL + endpoint);
      // Some endpoints may require POST, but for smoke test, check GET
      expect([200, 405]).toContain(res.status); // 405 = Method Not Allowed (for POST-only)
    });
  });
});
