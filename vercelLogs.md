# Vercel Deployment Log

[21:51:52.022] Cloning github.com/pgtipping/apt-affordability-checkerFE (Branch: main, Commit: dfcd7ed)
[21:51:52.587] Cloning completed: 565.000ms
[21:51:54.924] Restored build cache from previous deployment (ELS4iPAvL9cHj3zyTe2WUCHiJRP9)
[21:51:55.031] Running build in Washington, D.C., USA (East) – iad1
[21:51:55.423] Running "vercel build"
[21:51:55.803] Vercel CLI 41.5.0
[21:51:55.914] WARN! Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings
[21:51:56.145] Installing dependencies...
[21:51:57.282]
[21:51:57.283] up to date in 1s
[21:51:57.283]
[21:51:57.283] 154 packages are looking for funding
[21:51:57.283] run `npm fund` for details
[21:51:57.294] Detected Next.js version: 14.2.28
[21:51:57.297] Running "npm run build"
[21:51:57.449]
[21:51:57.450] > apartment-affordabily-checker@0.1.0 build
[21:51:57.450] > next build
[21:51:57.450]
[21:51:58.454] ▲ Next.js 14.2.28
[21:51:58.455]
[21:51:58.456] Linting and checking validity of types ...
[21:51:58.816] ⨯ ESLint: Invalid Options: - Unknown options: useEslintrc, extensions - 'extensions' has been removed.
[21:51:58.843] Creating an optimized production build ...
[21:51:59.333] Disabled SWC as replacement for Babel because of custom Babel configuration "babel.config.js" https://nextjs.org/docs/messages/swc-disabled
[21:51:59.955] Using external babel configuration from /vercel/path0/babel.config.js
[21:52:01.710] Failed to compile.
[21:52:01.710]
[21:52:01.710] ./src/utils/zoriLookup.js
[21:52:01.710] Module not found: Can't resolve 'csv-parse/sync'
[21:52:01.710]
[21:52:01.711] https://nextjs.org/docs/messages/module-not-found
[21:52:01.711]
[21:52:01.711] Import trace for requested module:
[21:52:01.711] ./pages/api/ai/rent-estimates.js
[21:52:01.711]
[21:52:01.727]
[21:52:01.728] > Build failed because of webpack errors
[21:52:01.753] Error: Command "npm run build" exited with 1
[21:52:01.990]
