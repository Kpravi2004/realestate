require("dotenv").config();

let db;

if (process.env.DB_TYPE === "sqlite") {
  db = require("./sqlite");
} else if (process.env.DB_TYPE === "mysql") {
  db = require("./mysql");
} else {
  throw new Error("Invalid DB_TYPE in .env");
}

module.exports = db;
