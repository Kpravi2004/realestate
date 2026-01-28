import { useState } from "react";
import axios from "axios";

export default function UploadProperty() {
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  const upload = async () => {
    await axios.post("http://localhost:5000/property/add", {
      user_id: 1, // demo user id
      location,
      area,
      price
    });
    alert("Property submitted for admin verification");
  };

  return (
    <div>
      <h3>Upload Property</h3>
      <input placeholder="Location" onChange={e => setLocation(e.target.value)} />
      <input placeholder="Area (sq ft)" onChange={e => setArea(e.target.value)} />
      <input placeholder="Expected Price" onChange={e => setPrice(e.target.value)} />
      <button onClick={upload}>Submit</button>
    </div>
  );
}
