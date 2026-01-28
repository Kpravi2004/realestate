const express = require("express");
const predictPrice = require("../utils/predictor");

const router = express.Router();

router.post("/predict", (req, res) => {
  const { current_year, past_years, predict_year } = req.body;

  // ✅ VALIDATIONS
  if (!current_year || !predict_year) {
    return res.status(400).json({
      error: "current_year and predict_year are required"
    });
  }

  if (!past_years || past_years.length < 1) {
    return res.status(400).json({
      error: "At least one previous year with factors and price is required"
    });
  }

  try {
    const result = predictPrice(
      current_year,
      past_years,
      predict_year
    );

    res.json({
      status: "success",
      result
    });
  } catch (err) {
    res.status(500).json({
      error: "Prediction failed"
    });
  }
});

module.exports = router;
