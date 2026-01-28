import express from "express";
import { loadAndTrain, predict } from "../ml/linearRegression.js";

const router = express.Router();
const model = loadAndTrain();

router.post("/", (req, res) => {
  const price = predict(req.body, model);
  res.json({
    predicted_price_lakhs: price.toFixed(2)
  });
});

export default router;
