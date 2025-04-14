# Active Context: Apartment Cost Analyzer

## Current Focus [Updated: 2025-04-14 04:09 EDT]

- **Update Results Page UI**
  - Removed main `<h1>Affordability Results</h1>` header from `pages/results.js`.
  - Changed AI summary card header to "Summary & Recommendations" in `pages/results.js`.
  - Added AI disclaimer text below the summary section in `pages/results.js`.
  - Added global CSS rules for responsive `h1` (`calc(0.375rem + 1.5vw)`) and `h2` (`calc(0.75rem + 0.9vw)`) font sizes in `styles/globals.css`.
- **Previous Focus: Fix Production AI Summary Error (504 Timeout)**
  - Configured Vercel function `maxDuration` to 60 seconds in `pages/api/ai/generate-summary.js`.
  - Set internal timeouts for primary and fallback OpenRouter API calls to 25 seconds each within the 60-second function limit.
- **Previous Focus: Fix Vercel Build & Runtime Errors**
  - Resolved Vercel build failure (`Module not found: Can't resolve 'csv-parse/sync'`) by switching ZORI rent lookup to use a pre-generated static JSON file (`public/data/zori-latest.json`).
  - Fixed `ReferenceError: styles is not defined` in multiple form components by adding missing CSS module imports.
  - Corrected rent estimate lookup logic in `src/utils/zoriLookup.js` to handle ZIP codes with leading zeros.
  - Formatted rent estimate display in `src/components/views/RentEstimateView.js` to two decimal places.

## Recent Changes (This Session) [Updated: 2025-04-14 04:09 EDT]

- Modified `pages/results.js`: Removed main H1, updated AI summary H5 text, added AI disclaimer paragraph.
- Modified `styles/globals.css`: Added responsive font size rules for `h1` and `h2`.
- Added `export const config = { maxDuration: 60 };` to `pages/api/ai/generate-summary.js`.
- Updated internal timeouts in `callOpenRouter` calls within `pages/api/ai/generate-summary.js` to 25000ms.
- Created script `scripts/convert-zori-csv-to-json.js` to generate `public/data/zori-latest.json`.
- Generated `public/data/zori-latest.json` with latest rent data per ZIP.
- Updated `src/utils/zoriLookup.js` to use `zori-latest.json` instead of runtime CSV parsing.
- Added `import styles from '../FormComponent.module.css'` to `LocationInput.js`, `MonthsToEvaluateInput.js`, `SecurityDepositInput.js`, `TotalSavingsInput.js`, `RentEstimateInput.js`, `NetHouseholdIncomeInput.js`.
- Updated `src/components/views/RentEstimateView.js` to format rent values using `toFixed(2)`.
- Installed `csv-parse` dependency (needed for conversion script).

## Next Steps [Updated: 2025-04-14 04:09 EDT]

1.  Thoroughly test the application locally, verifying the results page UI changes (headers, disclaimer, font sizes) and confirming the AI Summary generation works correctly with the timeout fixes.
2.  If local testing is successful, stage changes (`git add .`), commit (`git commit -m "feat: Update results page UI and fix AI summary timeout"`), and push changes.
3.  Deploy to Vercel and confirm the build succeeds and the application functions correctly in production (UI updates and AI summary).
4.  If deployment is successful, proceed with implementing the automated monthly update workflow for the ZORI data.
5.  Consider implementing AI response streaming in a future task for improved UX.
