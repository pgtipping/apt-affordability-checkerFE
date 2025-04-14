# Active Context: Apartment Cost Analyzer

## Current Focus [Updated: 2025-04-14 18:16 EDT]

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

1. Test new `/results` page functionality thoroughly.
2. Test AI summary generation (including fallback/timeout).
3. Finalize Next.js migration: test remaining features and API routes.
4. Finalize serverless migration: test serverless endpoints in staging/production, update Vercel env vars.
5. Review and improve user experience for results page layout and feedback mechanism.
