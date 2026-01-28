import { useParams, useNavigate } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP static data (replace with backend later)
  const property = {
    id,
    title: "Agricultural Land – Coconut Farm",
    location: "Thanjavur, Tamil Nadu",
    landType: "Agricultural",
    soilType: "Black",
    cropType: "Coconut",
    water: "Yes",
    distance: "9 km",
    size: "3 Acres",
    predictedPrice: "₹30.86 Lakhs",
    description:
      "High-quality agricultural land with coconut cultivation, continuous water supply, and good future appreciation potential.",
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>{property.title}</h2>
        <p>{property.location}</p>

        <div style={styles.grid}>
          <Info label="Land Type" value={property.landType} />
          <Info label="Soil Type" value={property.soilType} />
          <Info label="Crop Type" value={property.cropType} />
          <Info label="Water" value={property.water} />
          <Info label="Distance from City" value={property.distance} />
          <Info label="Land Size" value={property.size} />
        </div>

        <div style={styles.priceBox}>
          <p>Predicted Future Price</p>
          <h3>{property.predictedPrice}</h3>
        </div>

        <p style={{ marginTop: "10px" }}>{property.description}</p>

        <div style={styles.row}>
          <button onClick={() => navigate(-1)}>Back</button>
          <button>Contact Owner</button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.info}>
      <small>{label}</small>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "520px",
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "15px",
  },
  info: {
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "8px",
  },
  priceBox: {
    background: "#dcfce7",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
};
