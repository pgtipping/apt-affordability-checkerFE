const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    http: "stream-http",
    https: "https-browserify",
    zlib: "browserify-zlib",
    stream: "stream-browserify",
    crypto: "crypto-browserify",
    util: "util/",
    assert: "assert/",
    url: "url/",
  })
);
