// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// SQLite DB
const db = require("./db/sqlite");

// ML logic
const { loadAndTrain, predict } = require("./ml/linearRegression");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Train ML model once at server startup
const model = loadAndTrain();

/**
 * POST /api/predict
 * Takes input features
 * Returns predicted price
 * Saves prediction to SQLite
 */
app.post("/api/predict", (req, res) => {
  const {
    year,
    soil_type,
    water_availability,
    crop_type,
    distance_from_city_km,
    land_size_acres
  } = req.body;

  // Validation
  if (
    !year ||
    !soil_type ||
    !water_availability ||
    !crop_type ||
    !distance_from_city_km ||
    !land_size_acres
  ) {
    return res.status(400).json({
      error: "All input fields are required"
    });
  }

  const input = {
    year: Number(year),
    soil_type: Number(soil_type),
    water_availability: Number(water_availability),
    crop_type: Number(crop_type),
    distance_from_city_km: Number(distance_from_city_km),
    land_size_acres: Number(land_size_acres)
  };

  // ML Prediction
  const predictedPrice = predict(input, model);

  // Save prediction to SQLite
  db.run(
    `
    INSERT INTO predictions
    (year, soil_type, water_availability, crop_type, distance_from_city_km, land_size_acres, predicted_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.year,
      input.soil_type,
      input.water_availability,
      input.crop_type,
      input.distance_from_city_km,
      input.land_size_acres,
      predictedPrice
    ],
    (err) => {
      if (err) {
        console.error("❌ SQLite Insert Error:", err.message);
      }
    }
  );

  // Response
  res.json({
    predicted_price_lakhs: predictedPrice.toFixed(2)
  });
});

/**
 * GET /api/history
 * Returns all prediction history
 */
app.get("/api/history", (req, res) => {
  db.all(
    `
    SELECT 
      id,
      year,
      soil_type,
      water_availability,
      crop_type,
      distance_from_city_km,
      land_size_acres,
      predicted_price,
      created_at
    FROM predictions
    ORDER BY created_at DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to fetch prediction history"
        });
      }
      res.json(rows);
    }
  );
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
