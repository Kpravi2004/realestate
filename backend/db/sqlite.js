const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error("SQLite Error:", err.message);
  } else {
    console.log("SQLite Connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    area INTEGER,
    bedrooms INTEGER,
    age INTEGER,
    price INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = {
  insertPrediction: (data, callback) => {
    const sql = `
      INSERT INTO predictions (location, area, bedrooms, age, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, data, callback);
  }
};
