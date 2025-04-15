# Vercel Deployment Log

[20:07:09.047] Cloning github.com/pgtipping/apt-affordability-checkerFE (Branch: main, Commit: 3d73923)
[20:07:09.577] Cloning completed: 530.000ms
[20:07:11.275] Restored build cache from previous deployment (DUcTSEjPPE72A28cuzhqJ8zv3iZJ)
[20:07:11.751] Running build in Washington, D.C., USA (East) – iad1
[20:07:12.125] Running "vercel build"
[20:07:12.500] Vercel CLI 41.5.0
[20:07:12.612] WARN! Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings
[20:07:12.964] Installing dependencies...
[20:07:14.170]
[20:07:14.171] up to date in 1s
[20:07:14.172]
[20:07:14.172] 154 packages are looking for funding
[20:07:14.172] run `npm fund` for details
[20:07:14.178] Detected Next.js version: 14.2.28
[20:07:14.183] Running "npm run build"
[20:07:14.305]
[20:07:14.305] > apartment-affordabily-checker@0.1.0 prebuild
[20:07:14.305] > node scripts/convert-zori-csv-to-json.js
[20:07:14.306]
[20:07:14.425] Downloading latest ZORI data from https://files.zillowstatic.com/research/public_csvs/zori/Zip_zori_uc_sfrcondomfr_sm_month.csv...
[20:07:14.799] Downloaded ZORI data saved to /vercel/path0/public/data/temp_zori.csv
[20:07:15.352] Removed temporary file /vercel/path0/public/data/temp_zori.csv
[20:07:15.371] Wrote latest ZORI rent data (2025-02-28) for 6808 ZIPs to /vercel/path0/public/data/zori-latest.json
[20:07:15.394]
[20:07:15.395] > apartment-affordabily-checker@0.1.0 build
[20:07:15.395] > next build
[20:07:15.395]
[20:07:16.360] ▲ Next.js 14.2.28
[20:07:16.361]
[20:07:16.362] Linting and checking validity of types ...
[20:07:16.736] ⨯ ESLint: Invalid Options: - Unknown options: useEslintrc, extensions - 'extensions' has been removed.
[20:07:16.750] Creating an optimized production build ...
[20:07:17.302] Disabled SWC as replacement for Babel because of custom Babel configuration "babel.config.js" https://nextjs.org/docs/messages/swc-disabled
[20:07:17.737] Using external babel configuration from /vercel/path0/babel.config.js
[20:07:22.392] Failed to compile.
[20:07:22.393]
[20:07:22.393] ./pages/\_app.js
[20:07:22.394] Module not found: Can't resolve '@/styles/globals.css'
[20:07:22.394]
[20:07:22.395] https://nextjs.org/docs/messages/module-not-found
[20:07:22.395]
[20:07:22.410]
[20:07:22.411] > Build failed because of webpack errors
[20:07:22.441] Error: Command "npm run build" exited with 1
[20:07:22.787]
