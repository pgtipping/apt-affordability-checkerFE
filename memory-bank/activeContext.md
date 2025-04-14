# Active Context: Apartment Cost Analyzer

## Current Focus [Updated: 2025-04-14 16:35 EDT]

- **Implement Automated Monthly ZORI Data Update**
  - Modified `scripts/convert-zori-csv-to-json.js` to download the latest ZORI CSV data from Zillow.
  - Added `axios` dependency for downloading the CSV.
  - Added `prebuild` script to `package.json` to run the data conversion script before each build.
  - Created `.env.example` with placeholders for `VERCEL_DEPLOY_HOOK_URL` and `VERCEL_DEPLOY_TRIGGER_SECRET`.
  - Created API endpoint `pages/api/trigger-deploy.js` to trigger Vercel deployments via Deploy Hook.
  - Configured Vercel Cron Job in `vercel.json` to trigger the API endpoint monthly.

## Recent Changes (This Session) [Updated: 2025-04-14 16:35 EDT]

- Modified `scripts/convert-zori-csv-to-json.js`: Implemented automatic ZORI data download.
- Added `axios` dependency: `npm install axios`.
- Modified `package.json`: Added `prebuild` script to run data conversion.
- Created `.env.example`: Added placeholders for Vercel Deploy Hook URL and secret.
- Created `pages/api/trigger-deploy.js`: Implemented API endpoint to trigger Vercel deployments.
- Modified `vercel.json`: Configured Vercel Cron Job to trigger monthly deployments.
- Removed comments from `vercel.json`

## Next Steps [Updated: 2025-04-14 16:35 EDT]

1.  **Manually create a Vercel Deploy Hook** in the Vercel project settings and set the `VERCEL_DEPLOY_HOOK_URL` environment variable in Vercel.
2.  **Set the `VERCEL_DEPLOY_TRIGGER_SECRET` environment variable** in the Vercel project settings with a strong, random secret key.
3.  Stage changes (`git add .`).
4.  Commit changes (`git commit -m "feat: implement automated monthly ZORI data update"`).
5.  Push committed changes to the remote repository (`git push`).
6.  Monitor Vercel deployments to ensure the ZORI data is updated monthly.
