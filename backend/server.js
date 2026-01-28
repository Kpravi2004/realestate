// Load environment variables (optional but recommended)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const predictRoute = require("./routes/predict");

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", authRoutes);   // Register / Login
app.use("/api", predictRoute);      // Prediction

// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
