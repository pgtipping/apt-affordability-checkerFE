# Serverless Migration Plan

## Current Backend Structure

- **/validate**: Input validation and calculations
- **/feedback**: Feedback submission to PostgreSQL
- **/ai/\***: AI service endpoints
- PostgreSQL database connection

## Migration Strategy

### 1. Create API Directory Structure

```
/api/
  ├── validate/
  │   └── index.js (serverless function)
  ├── feedback/
  │   └── index.js (serverless function)
  └── ai/
      ├── rent-estimates.js
      ├── recommendations.js
      ├── predictions.js
      └── insights.js
```

### 2. Endpoint Migration

#### Validation Endpoint

- Move calculation logic to client-side (FormContext)
- Keep basic validation in serverless function
- Update client to handle calculations locally

#### Feedback Endpoint

- Convert to serverless function
- Use Vercel Postgres integration
- Update client-side submission code

#### AI Endpoints

- Keep as serverless functions
- Add proper error handling
- Implement caching

### 3. Database Changes

- Use Vercel Postgres instead of direct PG connection
- Create schema migration scripts
- Set up environment variables

### 4. Client-Side Updates

- Update fetch calls to new endpoints
- Modify error handling
- Implement local calculation logic

## Step-by-Step Implementation

1. **Set up /api directory**

```bash
mkdir -p api/{validate,feedback,ai}
```

2. **Create serverless functions**

```javascript
// api/feedback/index.js
import { createPool } from "@vercel/postgres";

export default async function handler(req, res) {
  const pool = createPool();
  try {
    const { feedback } = req.body;
    await pool.sql`INSERT INTO feedback (content) VALUES (${feedback})`;
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

3. **Update Vercel config**

```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

4. **Client-side changes**

```javascript
// Update fetch calls to use /api prefix
const response = await fetch("/api/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ feedback }),
});
```

## Testing Plan

1. Unit tests for serverless functions
2. Integration tests for API endpoints
3. End-to-end tests for full flow
4. Load testing for critical endpoints

## Rollout Strategy

1. Deploy to staging environment
2. Test with subset of users
3. Monitor performance
4. Full production rollout

---

## Finalization [Finalized: 2025-04-11 16:08 EDT]

**Provider:** Vercel Serverless Functions

**Rationale:** See finalized serverless-options.md for full analysis. Vercel is recommended for seamless integration, native support for serverless API routes, and minimal migration complexity.

**Open Questions/Blockers:**

- Confirm all backend logic can be migrated to Vercel serverless functions without loss of functionality.
- Review any provider-specific limitations (e.g., cold start, execution timeouts).
- Ensure all environment variables and secrets are securely managed in Vercel dashboard.

**Additional Notes:**

- All client-side updates must maintain 100% mobile responsiveness and WCAG accessibility standards.
- Update environment variables and secrets in Vercel as part of migration.
- Update memory bank before staging and pushing any migration-related changes.

**Status:** Migration plan finalized as of 2025-04-11 16:08 EDT.
