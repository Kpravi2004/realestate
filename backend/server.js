// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db"); // Auto-switches DB based on .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /predict
 * Accepts property details
 * Returns predicted price
 */
app.post("/predict", (req, res) => {
  const { location, area, bedrooms, age } = req.body;

  // Basic validation
  if (!location || !area || !bedrooms || !age) {
    return res.status(400).json({
      error: "All input fields are required"
    });
  }

  // Phase-1 prediction logic (placeholder ML)
  const predictedPrice =
    Number(area) * 5000 +
    Number(bedrooms) * 300000 -
    Number(age) * 10000;

  // Save prediction to DB (SQLite or MySQL)
  db.insertPrediction(
    [location, area, bedrooms, age, predictedPrice],
    (err) => {
      if (err) {
        console.error("DB Insert Error:", err);
      }
    }
  );

  // Send response
  res.json({
    predictedPrice
  });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
