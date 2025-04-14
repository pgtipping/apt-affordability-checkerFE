# Active Context: Apartment Cost Analyzer

## Current Focus [Updated: 2025-04-14 15:39 EDT]

- **Debug Currency Formatting Issue**
  - Added `console.log` statements to `CostDetails.js`, `Affordability.js`, and `RentEstimateView.js` to inspect the value and `typeof` data being passed for currency formatting at render time.
  - Kept direct `Number(value).toLocaleString(...)` formatting within these components.
  - Kept previous fixes: raw numbers from `calculateResults`, reinforced error handling, removed button, deleted old component, reduced API timeouts.
- **Prepare for Redeployment & Debugging**
  - Memory Bank updated with the addition of console logging for debugging.
  - Ready to stage, commit, and push changes. Next step requires user to redeploy and inspect console logs.
- **Previous Focus: Fix Currency Formatting (Direct `toLocaleString`) & Consolidate All Fixes**
  - Applied direct `toLocaleString` formatting (still resulted in missing commas).
- **Previous Focus: Fix Currency Formatting (via Utility)**
  - Deleted unused `src/components/Results.js`.
  - Kept reduced API timeouts (22s) in `pages/api/ai/generate-summary.js`.
- **Prepare for Redeployment**
  - Memory Bank updated with all recent fixes including the direct currency formatting approach.
  - Ready to stage, commit, and push changes for redeployment and testing.
- **Previous Focus: Fix Currency Formatting (via Utility)**
  - Attempted fix by removing `.toFixed(2)` from `calculateResults` (insufficient).
- **Previous Focus: Implement Currency Formatting & Consolidate Fixes**
  - Initial attempt at currency formatting using utility (failed).
- **Previous Focus: Consolidate Fixes for AI Summary & Results Page**
  - Reinforced error handling, removed button, deleted old component.
- **Previous Focus: Simplify AI Summary Error Handling**
  - Updated frontend error handling in `pages/results.js` to display a single, generic message.
- **Previous Focus: Fix Production AI Summary 504 Error (Attempt 2)**
  - Reduced internal timeouts for OpenRouter API calls in `pages/api/ai/generate-summary.js` from 25s to 22s each.
- **Previous Focus: Improve AI Summary Error Handling (Detailed)**
  - Initially updated frontend error handling in `pages/results.js` to show varied user-friendly messages.
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

## Recent Changes (This Session) [Updated: 2025-04-14 15:39 EDT]

- Added `console.log` for value/type to `CostDetails.js`.
- Added `console.log` for value/type to `Affordability.js`.
- Added `console.log` for value/type to `RentEstimateView.js`.
- Modified `src/components/CostDetails.js`: Use direct `toLocaleString` formatting (previous step).
- Modified `src/components/Affordability.js`: Use direct `toLocaleString` formatting (previous step).
- Modified `src/components/views/RentEstimateView.js`: Use direct `toLocaleString` formatting (previous step).
- Modified `pages/results.js`: Removed `.toFixed(2)` from `calculateResults` function.
- Created `src/utils/formatCurrency.js` (currently unused by components).
- Modified `pages/results.js`: Reinforced generic error handling in `fetch` call and removed redundant button.
- Deleted `src/components/Results.js`.
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

## Next Steps [Updated: 2025-04-14 15:39 EDT]

1.  Stage changes (`git add .`).
2.  Commit changes (`git commit -m "chore: add console logs for currency formatting debug"`).
3.  Push committed changes to the remote repository (`git push`).
4.  **User Action:** Redeploy to Vercel.
5.  **User Action:** Access the results page in the browser, open the developer console, and report the logged values and types for the currency fields.
6.  Based on console logs, determine the root cause and apply the correct fix for currency formatting.
7.  If formatting is fixed and deployment successful, proceed with ZORI data automation.
