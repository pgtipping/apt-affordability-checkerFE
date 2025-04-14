// Script to download latest ZORI CSV and convert to JSON for serverless use
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const csv = require("csv-parse/sync");

const ZORI_ZIP_CSV_URL =
  "https://files.zillowstatic.com/research/public_csvs/zori/Zip_zori_uc_sfrcondomfr_sm_month.csv";
const JSON_PATH = path.join(__dirname, "../public/data/zori-latest.json");
const TEMP_CSV_PATH = path.join(__dirname, "../public/data/temp_zori.csv"); // Temporary path for download

async function updateZoriData() {
  try {
    console.log(`Downloading latest ZORI data from ${ZORI_ZIP_CSV_URL}...`);
    const response = await axios({
      method: "get",
      url: ZORI_ZIP_CSV_URL,
      responseType: "stream",
    });

    // Save the downloaded CSV temporarily
    const writer = fs.createWriteStream(TEMP_CSV_PATH);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    console.log(`Downloaded ZORI data saved to ${TEMP_CSV_PATH}`);

    // Read the downloaded CSV file
    const fileContent = fs.readFileSync(TEMP_CSV_PATH, "utf8");
    const records = csv.parse(fileContent, { columns: true });

    // Clean up temporary file
    fs.unlinkSync(TEMP_CSV_PATH);
    console.log(`Removed temporary file ${TEMP_CSV_PATH}`);

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
      `Wrote latest ZORI rent data (${latestMonth}) for ${
        Object.keys(zoriLookup).length
      } ZIPs to ${JSON_PATH}`
    );
  } catch (error) {
    console.error("Error updating ZORI data:", error.message);
    // Attempt to clean up temp file even if error occurs
    if (fs.existsSync(TEMP_CSV_PATH)) {
      try {
        fs.unlinkSync(TEMP_CSV_PATH);
        console.log(`Removed temporary file ${TEMP_CSV_PATH} after error.`);
      } catch (cleanupError) {
        console.error(
          "Error removing temporary file after error:",
          cleanupError.message
        );
      }
    }
    process.exit(1); // Exit with error code
  }
}

// Execute the async function
updateZoriData();
