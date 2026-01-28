import { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/property/verified")
      .then(res => setProperties(res.data));
  }, []);

  return (
    <div>
      <h3>Available Properties</h3>
      {properties.map(p => (
        <div key={p.id} style={{ border: "1px solid black", margin: "10px" }}>
          <p><b>Location:</b> {p.location}</p>
          <p><b>Area:</b> {p.area} sq ft</p>
          <p><b>Price:</b> ₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
