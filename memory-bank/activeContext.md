# Active Context

## 2025-05-13 02:02:19 – Session End: Scenario Planner Correction
- Scenario Planner now uses 28% of gross income for rent (Ramit Sethi rule).
- All UI, guide text, and tooltips are updated for accuracy and clarity.
- Dark mode and layout are visually consistent across tabs.

**Next:** Monitor user feedback, consider state sharing, expand event types, and update memory bank as features evolve.

## 2025-05-12 18:45:11 – UI Update: Scenario Planner Tab Removed
- Removed the Scenario Planner tab/button from the Affordability Calculator page (`pages/affordability.js`).
- Only the Affordability Calculator tab is now visible to users, simplifying the UI and preparing for further refactor work.

## 2025-05-12 14:13:54 – End of Session: Industry-Standard Rent Rule Complete
- Scenario Planner now uses 28% of gross income for rent (Ramit Sethi/industry standard).
- UI, guide, and calculation logic fully aligned; source referenced in guide.
- Field labels updated to 'Gross Monthly Income'; expenses removed from rent calculation.
- All scenario event logic and results reflect this new approach.

### Next Steps
1. Monitor user feedback on the new rule and UX.
2. Refactor shared state (if desired) for seamless tab switching.
3. Expand scenario event types or add tips for users.
4. Update documentation and memory bank as features evolve.

---
- The app now opens to the new consolidated Affordability & Scenario Planner page (`/affordability`).
- Tab navigation provides both the main form and scenario planner in a single UI.
- Next step: Refactor both tabs to use shared state for income, expenses, savings, etc., ensuring seamless data flow and user experience.
: Apartment Cost Analyzer

## Session End [2025-05-11 00:12:22]

- Session ended to prepare for migration of scenario planning components from TypeScript/TSX to JavaScript/JSX.

### Next Steps
1. Convert all scenario planning components (`ScenarioForm`, `ScenarioList`, `ScenarioPlanner`, `ScenarioResults`) from `.tsx` to `.js`/`.jsx`.
2. Remove all TypeScript-specific syntax (types, interfaces, etc.).
3. Update imports throughout the app to use the new file extensions.
4. Test the scenario planning feature for linter/build/runtime errors.
5. Update memory bank with progress after migration.

## Previous Focus [Updated: 2025-04-14 18:16 EDT]

- **Implement Automated Monthly ZORI Data Update**
  - Modified `scripts/convert-zori-csv-to-json.js` to download the latest ZORI CSV data from Zillow.
  - Added `axios` dependency for downloading the CSV.
  - Added `prebuild` script to `package.json` to run the data conversion script before each build.
  - Created `.env.example` with placeholders for `VERCEL_DEPLOY_HOOK_URL` and `VERCEL_DEPLOY_TRIGGER_SECRET`.
  - Created API endpoint `pages/api/trigger-deploy.js` to trigger Vercel deployments via Deploy Hook.
  - Configured Vercel Cron Job in `vercel.json` to trigger the API endpoint monthly.
  - Removed `method` property from Vercel Cron Job configuration in `vercel.json` to fix deployment error.

## Recent Changes (This Session) [Updated: 2025-04-14 18:16 EDT]

- Modified `vercel.json`: Removed `method` property from Vercel Cron Job configuration.

## Next Steps [Updated: 2025-04-14 18:16 EDT]

1. Monitor Vercel deployments to ensure the ZORI data is updated monthly.
2. Test new `/results` page functionality thoroughly.
3. Test AI summary generation (including fallback/timeout).
4. Finalize Next.js migration: test remaining features and API routes.
5. Finalize serverless migration: test serverless endpoints in staging/production, update Vercel env vars.
6. Review and improve user experience for results page layout and feedback mechanism.
7. Verify CSS changes are reflected in production.
