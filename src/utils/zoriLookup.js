// Utility to provide rent lookup by ZIP code using pre-generated JSON
const zoriData = require("../../public/data/zori-latest.json");

function getRentByZip(zip) {
  const normalizedZip = String(zip).padStart(5, "0");
  return {
    zip: normalizedZip,
    rent: zoriData.data[normalizedZip] || null,
    month: zoriData.month,
    source: "Zillow Observed Rent Index (ZORI)",
  };
}

module.exports = { getRentByZip };
