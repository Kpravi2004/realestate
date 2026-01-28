import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve("database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite connection failed:", err.message);
  } else {
    console.log("SQLite connected");
  }
});

/* Create table (runs once safely) */
db.run(`
  CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    soil_type INTEGER,
    water_availability INTEGER,
    crop_type INTEGER,
    distance_from_city_km REAL,
    land_size_acres REAL,
    predicted_price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
