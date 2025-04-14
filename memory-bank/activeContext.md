# Active Context: Apartment Cost Analyzer

## Current Focus [Updated: 2025-04-14 15:00 EDT]

- **Simplify AI Summary Error Handling**
  - Updated frontend error handling in `pages/results.js` to display a single, generic message ("Could not connect to the service...") for _all_ errors during AI summary generation, while still logging the specific error to the console.
- **Fix Production AI Summary 504 Error (Attempt 2)**
  - Reduced internal timeouts for OpenRouter API calls in `pages/api/ai/generate-summary.js` from 25s to 22s each. (Kept from previous step)
- **Prepare for Redeployment**
  - Memory Bank updated with the timeout fix and the simplified frontend error handling.
  - Ready to stage, commit, and push changes for redeployment and testing.
- **Previous Focus: Improve AI Summary Error Handling (Detailed)**
  - Initially updated frontend error handling in `pages/results.js` to show varied user-friendly messages based on error type. This was superseded by the simplification request.
- **Previous Focus: Prepare for Deployment (Attempt 1)**
  - Initial fixes (AI summary timeout config, UI updates) were complete and committed.
- **Previous Focus: Update Results Page UI & Styles**
  - Removed main `<h1>Affordability Results</h1>` header from `pages/results.js`.
  - Changed AI summary card header to "Summary & Recommendations" in `pages/results.js`.
  - Added AI disclaimer text below the summary section in `pages/results.js`.
  - Added global CSS rules for responsive `h1` (`calc(0.375rem + 1.5vw)`) and `h2` (`calc(0.75rem + 0.9vw)`) font sizes in `styles/globals.css`.
  - Added specific CSS rules in `styles/globals.css` to apply the `h2` font size (`calc(0.75rem + 0.9vw)`) to `h2`, `h3`, and `h4` elements within the `.ai-summary-markdown` container.
- **Previous Focus: Fix Production AI Summary Error (504 Timeout - Attempt 1)**
  - Configured Vercel function `maxDuration` to 60 seconds in `pages/api/ai/generate-summary.js`.
  - Set initial internal timeouts for OpenRouter API calls to 25 seconds each.
- **Previous Focus: Fix Vercel Build & Runtime Errors**
  - Resolved Vercel build failure (`Module not found: Can't resolve 'csv-parse/sync'`) by switching ZORI rent lookup to use a pre-generated static JSON file (`public/data/zori-latest.json`).
  - Fixed `ReferenceError: styles is not defined` in multiple form components by adding missing CSS module imports.
  - Corrected rent estimate lookup logic in `src/utils/zoriLookup.js` to handle ZIP codes with leading zeros.
  - Formatted rent estimate display in `src/components/views/RentEstimateView.js` to two decimal places.

## Recent Changes (This Session) [Updated: 2025-04-14 15:00 EDT]

- Modified `pages/results.js`: Simplified error handling in `fetch` call to `/api/ai/generate-summary` to show a single generic message for all errors.
- Modified `pages/api/ai/generate-summary.js`: Reduced internal timeouts for `callOpenRouter` from 25000ms to 22000ms.
- Modified `styles/globals.css`: Added specific rules for `.ai-summary-markdown h2, h3, h4` font size.
- Modified `pages/results.js`: Removed main H1, updated AI summary H5 text, added AI disclaimer paragraph.
- Modified `styles/globals.css`: Added responsive font size rules for `h1` and `h2`.
- Added `export const config = { maxDuration: 60 };` to `pages/api/ai/generate-summary.js`.
- Updated internal timeouts in `callOpenRouter` calls within `pages/api/ai/generate-summary.js` to 25000ms (Initial attempt).
- Created script `scripts/convert-zori-csv-to-json.js` to generate `public/data/zori-latest.json`.
- Generated `public/data/zori-latest.json` with latest rent data per ZIP.
- Updated `src/utils/zoriLookup.js` to use `zori-latest.json` instead of runtime CSV parsing.
- Added `import styles from '../FormComponent.module.css'` to `LocationInput.js`, `MonthsToEvaluateInput.js`, `SecurityDepositInput.js`, `TotalSavingsInput.js`, `RentEstimateInput.js`, `NetHouseholdIncomeInput.js`.
- Updated `src/components/views/RentEstimateView.js` to format rent values using `toFixed(2)`.
- Installed `csv-parse` dependency (needed for conversion script).

## Next Steps [Updated: 2025-04-14 15:00 EDT]

1.  Stage changes (`git add .`).
2.  Commit changes (`git commit -m "fix: simplify AI summary error message & reduce timeouts"`).
3.  Push committed changes to the remote repository (`git push`).
4.  Redeploy to Vercel and confirm the 504 error is resolved and the generic frontend error message displays correctly on failure.
5.  If deployment is successful, proceed with implementing the automated monthly update workflow for the ZORI data.
6.  Consider implementing AI response streaming in a future task for improved UX.
