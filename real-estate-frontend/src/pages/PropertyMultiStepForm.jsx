import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

const YEARS = [
  CURRENT_YEAR - 1,
  CURRENT_YEAR - 2,
  CURRENT_YEAR - 3,
  CURRENT_YEAR - 4,
  CURRENT_YEAR - 5,
];

const WATER_OPTIONS = ["Yes", "No"];
const SOIL_TYPES = ["Black", "Red", "Alluvial", "Laterite"];
const CROP_TYPES = ["Coconut", "Banana", "Drumstick", "Other"];

export default function PropertyMultiStepForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // 🔹 Current year (DEFAULTED)
  const [currentYear, setCurrentYear] = useState({
    year: CURRENT_YEAR,
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
      predict_year: CURRENT_YEAR + 2,
    };

    console.log("Final Payload →", payload);

    // Later connect backend here
    navigate("/property/1");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {step === 1 && (
          <>
            <h2>This Year Details ({CURRENT_YEAR})</h2>

            <select name="soil_type" onChange={handleCurrentChange}>
              <option value="">Select Soil Type</option>
              {SOIL_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select name="water_availability" onChange={handleCurrentChange}>
              <option value="">Water Availability</option>
              {WATER_OPTIONS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>

            <select name="crop_type" onChange={handleCurrentChange}>
              <option value="">Crop Type</option>
              {CROP_TYPES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <input
              type="number"
              name="distance_from_city_km"
              placeholder="Distance from City (km)"
              onChange={handleCurrentChange}
            />

            <input
              type="number"
              name="land_size_acres"
              placeholder="Land Size (acres)"
              onChange={handleCurrentChange}
            />

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Previous Year Data</h2>

            {pastYears.map((item, index) => (
              <div key={index} style={styles.box}>
                <select name="year" onChange={(e) => handlePastChange(index, e)}>
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <select
                  name="soil_type"
                  onChange={(e) => handlePastChange(index, e)}
                >
                  <option value="">Soil Type</option>
                  {SOIL_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  name="water_availability"
                  onChange={(e) => handlePastChange(index, e)}
                >
                  <option value="">Water Availability</option>
                  {WATER_OPTIONS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>

                <select
                  name="crop_type"
                  onChange={(e) => handlePastChange(index, e)}
                >
                  <option value="">Crop Type</option>
                  {CROP_TYPES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <input
                  type="number"
                  name="distance_from_city_km"
                  placeholder="Distance from City (km)"
                  onChange={(e) => handlePastChange(index, e)}
                />

                <input
                  type="number"
                  name="land_size_acres"
                  placeholder="Land Size (acres)"
                  onChange={(e) => handlePastChange(index, e)}
                />

                <input
                  type="number"
                  name="price_lakhs"
                  placeholder="Price (Lakhs)"
                  onChange={(e) => handlePastChange(index, e)}
                />
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
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
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
