import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    location: "",
    area: "",
    bedrooms: "",
    age: ""
  });

  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setPrice(data.predictedPrice);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Real Estate Price Prediction</h2>

      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Location" onChange={handleChange} required /><br /><br />
        <input name="area" placeholder="Area (sq.ft)" onChange={handleChange} required /><br /><br />
        <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange} required /><br /><br />
        <input name="age" placeholder="Property Age" onChange={handleChange} required /><br /><br />

        <button type="submit">Predict Price</button>
      </form>

      {price && (
        <h3>Predicted Price: ₹ {price}</h3>
      )}
    </div>
  );
}

export default App;
