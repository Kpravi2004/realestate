import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PropertyMultiStepForm() {
  const [step, setStep] = useState(1);

  const [currentYear, setCurrentYear] = useState({
    year: 2024,
    soil_type: "",
    water_availability: "",
    crop_type: "",
    distance_from_city_km: "",
    land_size_acres: "",
  });

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

    console.log("Final Payload →", payload);
    alert("Data submitted successfully ✅ Check console");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 p-4">
      <Card className="max-w-2xl w-full rounded-2xl shadow-lg">
        <CardContent className="p-6 space-y-4">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">Current Year Details</h2>

              <input name="soil_type" placeholder="Soil Type" onChange={handleCurrentChange} />
              <input name="water_availability" placeholder="Water Availability (Yes/No)" onChange={handleCurrentChange} />
              <input name="crop_type" placeholder="Crop Type" onChange={handleCurrentChange} />
              <input name="distance_from_city_km" placeholder="Distance from City (km)" onChange={handleCurrentChange} />
              <input name="land_size_acres" placeholder="Land Size (acres)" onChange={handleCurrentChange} />

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>Next</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold">Previous Year Data</h2>

              {pastYears.map((item, index) => (
                <div key={index} className="border p-3 rounded-xl space-y-2">
                  <input name="year" placeholder="Year" onChange={(e) => handlePastChange(index, e)} />
                  <input name="soil_type" placeholder="Soil Type" onChange={(e) => handlePastChange(index, e)} />
                  <input name="water_availability" placeholder="Water Availability" onChange={(e) => handlePastChange(index, e)} />
                  <input name="crop_type" placeholder="Crop Type" onChange={(e) => handlePastChange(index, e)} />
                  <input name="distance_from_city_km" placeholder="Distance from City" onChange={(e) => handlePastChange(index, e)} />
                  <input name="land_size_acres" placeholder="Land Size" onChange={(e) => handlePastChange(index, e)} />
                  <input name="price_lakhs" placeholder="Price (Lakhs)" onChange={(e) => handlePastChange(index, e)} />
                </div>
              ))}

              <Button variant="outline" onClick={addPastYear}>
                + Add another year
              </Button>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
