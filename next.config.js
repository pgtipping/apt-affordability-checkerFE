// Minimal Next.js config to enable Vercel build
module.exports = {
  assetPrefix:
    process.env.NODE_ENV === "production" ? `/?cacheBuster=${Date.now()}` : "",
};
