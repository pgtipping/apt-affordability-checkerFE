// Script to convert ZORI CSV to JSON for serverless use
const fs = require("fs");
const path = require("path");
const csv = require("csv-parse/sync");

const CSV_PATH = path.join(
  __dirname,
  "../public/data/Zip_zori_uc_sfrcondomfr_sm_month.csv"
);
const JSON_PATH = path.join(__dirname, "../public/data/zori-latest.json");

const fileContent = fs.readFileSync(CSV_PATH, "utf8");
const records = csv.parse(fileContent, { columns: true });

// Find the latest month column
const monthColumns = Object.keys(records[0]).filter((col) =>
  /^\d{4}-\d{2}-\d{2}$/.test(col)
);
const latestMonth = monthColumns.sort().pop();

// Build lookup: { zip: rent }
const zoriLookup = {};
for (const row of records) {
  const zip = row["RegionName"];
  const rent = row[latestMonth];
  if (zip && rent && !isNaN(Number(rent))) {
    zoriLookup[zip.padStart(5, "0")] = Number(rent);
  }
}

fs.writeFileSync(
  JSON_PATH,
  JSON.stringify(
    {
      month: latestMonth,
      data: zoriLookup,
    },
    null,
    2
  )
);

console.log(
  `Wrote latest ZORI rent data for ${
    Object.keys(zoriLookup).length
  } ZIPs to ${JSON_PATH}`
);
