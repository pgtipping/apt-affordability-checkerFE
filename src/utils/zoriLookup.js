// Utility to parse ZORI CSV and provide rent lookup by ZIP code
const fs = require("fs");
const path = require("path");
const csv = require("csv-parse/sync");

// Path to the ZORI CSV file
const ZORI_CSV_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "Zip_zori_uc_sfrcondomfr_sm_month.csv"
);

// Parse the CSV and build a lookup table: { [zip]: latestRent }
let zoriLookup = null;
let latestMonth = null;

function loadZoriData() {
  if (zoriLookup) return; // Already loaded

  const fileContent = fs.readFileSync(ZORI_CSV_PATH, "utf8");
  const records = csv.parse(fileContent, { columns: true });

  // Find the latest month column
  const monthColumns = Object.keys(records[0]).filter((col) =>
    /^\d{4}-\d{2}-\d{2}$/.test(col)
  );
  latestMonth = monthColumns.sort().pop();

  // Build lookup: { zip: rent }
  zoriLookup = {};
  for (const row of records) {
    const zip = row["RegionName"];
    const rent = row[latestMonth];
    if (zip && rent && !isNaN(Number(rent))) {
      zoriLookup[zip] = Number(rent);
    }
  }
}

function getRentByZip(zip) {
  loadZoriData();
  return {
    zip,
    rent: zoriLookup[zip] || null,
    month: latestMonth,
    source: "Zillow Observed Rent Index (ZORI)",
  };
}

module.exports = { getRentByZip };
