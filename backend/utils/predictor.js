function encodeSoil(soil) {
  if (soil === "Black") return 3;
  if (soil === "Red") return 2;
  return 1;
}

function encodeCrop(crop) {
  if (crop === "Coconut") return 4;
  if (crop === "Banana") return 3;
  if (crop === "Drumstick") return 2;
  return 1;
}

// 🔹 BASE PRICE FROM FACTORS (MULTIPLE LINEAR REGRESSION STYLE)
function basePriceFromFactors(factors) {
  const soil = encodeSoil(factors.soil_type);
  const crop = encodeCrop(factors.crop_type);
  const water = factors.water_availability === "Yes" ? 1 : 0;

  const score =
    soil * 5 +
    water * 8 +
    crop * 6 -
    factors.distance_from_city_km * 1.2 +
    factors.land_size_acres * 10;

  return score / 2; // convert to lakhs
}

// 🔹 TREND CALCULATION USING MULTIPLE PREVIOUS YEARS
function trendFromPastYears(pastYears) {
  // Sort by year
  const sorted = [...pastYears].sort((a, b) => a.year - b.year);

  // Single previous year → default 10% growth
  if (sorted.length === 1) {
    return {
      lastPrice: sorted[0].price_lakhs,
      growthRate: sorted[0].price_lakhs * 0.1
    };
  }

  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const growthRate =
    (last.price_lakhs - first.price_lakhs) /
    (last.year - first.year);

  return {
    lastPrice: last.price_lakhs,
    growthRate
  };
}

// 🔹 FINAL PREDICTION FUNCTION
function predictPrice(currentYear, pastYears, predictYear) {
  const basePrice = basePriceFromFactors(currentYear);

  const trend = trendFromPastYears(pastYears);

  const yearsAhead = predictYear - currentYear.year;

  const trendPrice =
    trend.lastPrice + trend.growthRate * yearsAhead;

  const finalPrice =
    basePrice * 0.6 + trendPrice * 0.4;

  return {
    current_year_used: currentYear.year,
    years_of_history_used: pastYears.length,
    base_price_lakhs: Number(basePrice.toFixed(2)),
    growth_rate_lakhs_per_year: Number(trend.growthRate.toFixed(2)),
    trend_price_lakhs: Number(trendPrice.toFixed(2)),
    predicted_price_lakhs: Number(finalPrice.toFixed(2))
  };
}

module.exports = predictPrice;
