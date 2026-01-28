const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "realestate_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
    return;
  }
  console.log("MySQL Connected");
});

app.post("/predict", (req, res) => {
  const { location, area, bedrooms, age } = req.body;

  const predictedPrice =
    area * 5000 +
    bedrooms * 300000 -
    age * 10000;

  const sql = `
    INSERT INTO predictions (location, area, bedrooms, age, price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [location, area, bedrooms, age, predictedPrice]);

  res.json({ predictedPrice });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
