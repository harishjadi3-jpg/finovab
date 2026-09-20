const dns = require("dns");

// Fix MongoDB Atlas DNS resolution
dns.setServers(["1.1.1.1"]);

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { PDFParse } = require("pdf-parse");

const Location = require("../models/Location");

// =====================================================
// LOAD ENVIRONMENT VARIABLES
// =====================================================

dotenv.config({
  path: path.join(__dirname, "..", ".env")
});


// =====================================================
// PDF LOCATION
// =====================================================

const pdfPath = path.join(
  __dirname,
  "India_State_Wise_District_Latitude_Longitude.pdf"
);


// =====================================================
// PARSE DISTRICT DATA FROM PDF
// =====================================================

const parseDistrictData = (text) => {

  const locations = [];

  // Split PDF into lines
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  let currentState = null;

  for (let line of lines) {

    // -----------------------------------------------
    // Ignore headings
    // -----------------------------------------------

    if (
      line.startsWith("India —") ||
      line.startsWith("Coordinates are") ||
      line.startsWith("S.No.") ||
      line.startsWith("S.No. District")
    ) {
      continue;
    }

    // -----------------------------------------------
    // Ignore image markers
    // -----------------------------------------------

    if (line.startsWith("<IMAGE")) {
      continue;
    }

    // -----------------------------------------------
    // Detect district row
    //
    // Example:
    // 1 Hyderabad 17.39000 78.49000
    // -----------------------------------------------

    const districtMatch = line.match(
      /^(\d+)\s+(.+?)\s+(-?\d+\.\d+)\s+(-?\d+\.\d+)$/
    );

    if (districtMatch) {

      const district = districtMatch[2].trim();

      const latitude = Number(
        districtMatch[3]
      );

      const longitude = Number(
        districtMatch[4]
      );

      if (
        currentState &&
        !Number.isNaN(latitude) &&
        !Number.isNaN(longitude)
      ) {

        locations.push({
          state: currentState,
          district,
          latitude,
          longitude
        });
      }

      continue;
    }

    // -----------------------------------------------
    // Some PDF pages contain several district rows
    // on one line.
    //
    // Example:
    // 1 Anjaw 28.07000 96.83000
    // 2 Changlang 27.12000 96.73000
    // -----------------------------------------------

    const multiRowRegex =
      /(\d+)\s+(.+?)\s+(-?\d+\.\d+)\s+(-?\d+\.\d+)/g;

    const matches = [...line.matchAll(multiRowRegex)];

    if (matches.length > 0) {

      for (const match of matches) {

        const district = match[2].trim();

        const latitude = Number(match[3]);

        const longitude = Number(match[4]);

        if (
          currentState &&
          !Number.isNaN(latitude) &&
          !Number.isNaN(longitude)
        ) {

          locations.push({
            state: currentState,
            district,
            latitude,
            longitude
          });
        }
      }

      continue;
    }

    // -----------------------------------------------
    // Detect state name
    // -----------------------------------------------

    const ignoredHeaders = [
      "S.No.",
      "District",
      "Latitude",
      "Longitude"
    ];

    if (
      !ignoredHeaders.some(
        header => line.includes(header)
      ) &&
      !/^\d/.test(line) &&
      !line.includes("Longitude") &&
      !line.includes("Latitude")
    ) {

      // Avoid known non-state text
      if (
        line !== "India" &&
        !line.includes("Coordinates") &&
        !line.includes("representative") &&
        !line.includes("administrative")
      ) {
        currentState = line.trim();
      }
    }
  }

  return locations;
};


// =====================================================
// REMOVE DUPLICATES
// =====================================================

const removeDuplicates = (locations) => {

  const unique = new Map();

  for (const location of locations) {

    const key =
      `${location.state.toLowerCase()}|${location.district.toLowerCase()}`;

    if (!unique.has(key)) {
      unique.set(key, location);
    }
  }

  return Array.from(unique.values());
};


// =====================================================
// SEED DATABASE
// =====================================================

const seedLocations = async () => {

  try {

    // -----------------------------------------------
    // Check PDF
    // -----------------------------------------------

    if (!fs.existsSync(pdfPath)) {

      console.error(
        "District coordinate PDF not found."
      );

      console.error(
        `Expected file:\n${pdfPath}`
      );

      process.exit(1);
    }


    // -----------------------------------------------
    // Connect MongoDB
    // -----------------------------------------------

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected for location seeding"
    );


    // -----------------------------------------------
    // Read PDF
    // -----------------------------------------------

    console.log(
      "Reading district coordinate PDF..."
    );

    const pdfBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({
  data: pdfBuffer
});

const pdfData = await parser.getText();

await parser.destroy();


    // -----------------------------------------------
    // Parse locations
    // -----------------------------------------------

    let locations =
      parseDistrictData(pdfData.text);


    // -----------------------------------------------
    // Remove duplicate districts
    // -----------------------------------------------

    locations =
      removeDuplicates(locations);


    // -----------------------------------------------
    // Validate
    // -----------------------------------------------

    console.log(
      `Parsed ${locations.length} district records`
    );


    if (locations.length === 0) {

      console.error(
        "No district records were detected from the PDF."
      );

      await mongoose.connection.close();

      process.exit(1);
    }


    // -----------------------------------------------
    // Delete old location data
    // -----------------------------------------------

    await Location.deleteMany({});

    console.log(
      "Existing location records removed"
    );


    // -----------------------------------------------
    // Insert locations
    // -----------------------------------------------

    const inserted =
      await Location.insertMany(
        locations,
        {
          ordered: false
        }
      );


    // -----------------------------------------------
    // Success
    // -----------------------------------------------

    console.log(
      `${inserted.length} district locations inserted successfully`
    );


    // -----------------------------------------------
    // Show state count
    // -----------------------------------------------

    const states =
      [...new Set(
        inserted.map(
          location => location.state
        )
      )];

    console.log(
      `States / UTs loaded: ${states.length}`
    );


    // -----------------------------------------------
    // Show Telangana verification
    // -----------------------------------------------

    const telangana =
      inserted.filter(
        location =>
          location.state.toLowerCase() ===
          "telangana"
      );

    console.log(
      `Telangana districts loaded: ${telangana.length}`
    );


    telangana.forEach(location => {

      console.log(
        `${location.district} -> ` +
        `${location.latitude}, ` +
        `${location.longitude}`
      );

    });


    // -----------------------------------------------
    // Close DB
    // -----------------------------------------------

    await mongoose.connection.close();

    console.log(
      "Database connection closed"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Location seeding failed:"
    );

    console.error(
      error.message
    );

    try {
      await mongoose.connection.close();
    } catch (closeError) {}

    process.exit(1);
  }
};


// =====================================================
// RUN
// =====================================================

seedLocations();