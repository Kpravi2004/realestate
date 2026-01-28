import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyMultiStepForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // 🔹 Current year (factors only)
  const [currentYear, setCurrentYear] = useState({
    year: 2024,
    soil_type: "",
    water_availability: "",
    crop_type: "",
    distance_from_city_km: "",
    land_size_acres: "",
  });

  // 🔹 At least ONE previous year required
  const [pastYears, setPastYears] = useState([
    {
      year: "",
      soil_type: "",
      water_availability: "",
      crop_type: "",
      distance_from_city_km: "",
      land_size_acres: "",
      price_lakhs: "",
    },
  ]);

  const handleCurrentChange = (e) => {
    setCurrentYear({ ...currentYear, [e.target.name]: e.target.value });
  };

  const handlePastChange = (index, e) => {
    const updated = [...pastYears];
    updated[index][e.target.name] = e.target.value;
    setPastYears(updated);
  };

  const addPastYear = () => {
    setPastYears([
      ...pastYears,
      {
        year: "",
        soil_type: "",
        water_availability: "",
        crop_type: "",
        distance_from_city_km: "",
        land_size_acres: "",
        price_lakhs: "",
      },
    ]);
  };

  const handleSubmit = () => {
    const payload = {
      current_year: currentYear,
      past_years: pastYears,
      predict_year: 2026,
    };

    console.log("Payload sent to backend 👉", payload);

    // Later: send payload to backend
    // fetch("/api/predict", { ... })

    navigate("/property/1"); // demo redirect
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {step === 1 && (
          <>
            <h2>This Year Details</h2>

            <input name="soil_type" placeholder="Soil Type" onChange={handleCurrentChange} />
            <input name="water_availability" placeholder="Water Availability (Yes/No)" onChange={handleCurrentChange} />
            <input name="crop_type" placeholder="Crop Type" onChange={handleCurrentChange} />
            <input name="distance_from_city_km" placeholder="Distance from City (km)" onChange={handleCurrentChange} />
            <input name="land_size_acres" placeholder="Land Size (acres)" onChange={handleCurrentChange} />

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Previous Year Data</h2>

            {pastYears.map((item, index) => (
              <div key={index} style={styles.box}>
                <input name="year" placeholder="Year" onChange={(e) => handlePastChange(index, e)} />
                <input name="soil_type" placeholder="Soil Type" onChange={(e) => handlePastChange(index, e)} />
                <input name="water_availability" placeholder="Water Availability" onChange={(e) => handlePastChange(index, e)} />
                <input name="crop_type" placeholder="Crop Type" onChange={(e) => handlePastChange(index, e)} />
                <input name="distance_from_city_km" placeholder="Distance from City" onChange={(e) => handlePastChange(index, e)} />
                <input name="land_size_acres" placeholder="Land Size" onChange={(e) => handlePastChange(index, e)} />
                <input name="price_lakhs" placeholder="Price (Lakhs)" onChange={(e) => handlePastChange(index, e)} />
              </div>
            ))}

            <button onClick={addPastYear}>+ Add Another Year</button>

            <div style={styles.row}>
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
  },
  box: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};
