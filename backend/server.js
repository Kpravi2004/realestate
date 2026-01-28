// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// SQLite DB
const db = require("./db/sqlite");

// ML logic
const { loadAndTrain, predict } = require("./ml/linearRegression");
const authRoutes = require("./routes/auth");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
