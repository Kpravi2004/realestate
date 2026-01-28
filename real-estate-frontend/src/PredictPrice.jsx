import axios from "axios";

export default function PredictPrice() {
  const predict = async () => {
    const res = await axios.post("http://localhost:5000/ml/predict", {
      years: [2019, 2021, 2023],
      prices: [3000000, 3800000, 4500000],
      futureYear: 2026
    });

    alert("Predicted Future Price: ₹" + Math.round(res.data.predictedPrice));
  };

  return (
    <div>
      <h3>Predict Future Property Price</h3>
      <button onClick={predict}>Predict</button>
    </div>
  );
}
