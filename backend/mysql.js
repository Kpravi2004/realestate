const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = {
  insertPrediction: (data, callback) => {
    const sql = `
      INSERT INTO predictions (location, area, bedrooms, age, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, data, callback);
  }
};
