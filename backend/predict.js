const express = require("express");
const router = express.Router();

router.post("/predict", (req, res) => {
  const { years, prices, futureYear } = req.body;

  const n = years.length;
  const meanX = years.reduce((a,b)=>a+b)/n;
  const meanY = prices.reduce((a,b)=>a+b)/n;

  let num = 0, den = 0;
  for(let i=0;i<n;i++){
    num += (years[i]-meanX)*(prices[i]-meanY);
    den += (years[i]-meanX)**2;
  }

  const m = num / den;
  const c = meanY - m * meanX;

  const predicted = m * futureYear + c;
  res.json({ predictedPrice: predicted });
});

module.exports = router;
