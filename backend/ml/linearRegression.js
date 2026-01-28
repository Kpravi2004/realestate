import fs from "fs";

function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function trainModel(data) {
  const X = data.map(d => [
    1,
    d.year,
    d.soil_type,
    d.water_availability,
    d.crop_type,
    d.distance_from_city_km,
    d.land_size_acres
  ]);

  const y = data.map(d => d.price_lakhs);

  // Simple normal equation approximation (small dataset)
  const coefficients = Array(X[0].length).fill(0);

  for (let j = 0; j < coefficients.length; j++) {
    let num = 0, den = 0;
    for (let i = 0; i < X.length; i++) {
      num += X[i][j] * y[i];
      den += X[i][j] * X[i][j];
    }
    coefficients[j] = num / den;
  }

  return coefficients;
}

export function loadAndTrain() {
  const raw = fs.readFileSync("./data/land_prices.csv", "utf8");
  const lines = raw.trim().split("\n").slice(1);

  const data = lines.map(line => {
    const [
      year,
      soil_type,
      water_availability,
      crop_type,
      distance_from_city_km,
      land_size_acres,
      price_lakhs
    ] = line.split(",").map(Number);

    return {
      year,
      soil_type,
      water_availability,
      crop_type,
      distance_from_city_km,
      land_size_acres,
      price_lakhs
    };
  });

  return trainModel(data);
}

export function predict(input, coeffs) {
  return (
    coeffs[0] +
    coeffs[1] * input.year +
    coeffs[2] * input.soil_type +
    coeffs[3] * input.water_availability +
    coeffs[4] * input.crop_type +
    coeffs[5] * input.distance_from_city_km +
    coeffs[6] * input.land_size_acres
  );
}
