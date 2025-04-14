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

1.  **Manually create a Vercel Deploy Hook** in the Vercel project settings and set the `VERCEL_DEPLOY_HOOK_URL` environment variable in Vercel.
2.  **Set the `VERCEL_DEPLOY_TRIGGER_SECRET` environment variable** in the Vercel project settings with a strong, random secret key.
3.  Stage changes (`git add .`).
4.  Commit changes (`git commit -m "feat: implement automated monthly ZORI data update"`).
5.  Push committed changes to the remote repository (`git push`).
6.  Monitor Vercel deployments to ensure the ZORI data is updated monthly.
