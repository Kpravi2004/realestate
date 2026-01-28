import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful ✅");
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your real estate account</p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register" className="link">Register</Link>
        </p>
      </form>
    </div>
  );
}
