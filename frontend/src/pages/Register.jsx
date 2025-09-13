import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
    bloodGroup: "",
    dob: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for phone and pincode
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert("❌ Please enter a valid 10-digit phone number");
      return;
    }
    if (!pincodeRegex.test(formData.pincode)) {
      alert("❌ Please enter a valid 6-digit pincode");
      return;
    }

    try {
      await api.post("/auth/register", formData);
      alert("✅ Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-frame">
        <h1 className="landing-title">Sign Up for RedBond</h1>

        <div className="landing-card">
          <form onSubmit={handleSubmit} className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              maxLength={10}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="input-field"
              maxLength={6}
              required
            />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Blood Group (optional)</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input-field"
            />

            <button type="submit" className="button-primary">
              Register
            </button>
          </form>

          <p className="footer-text" style={{ marginTop: "1rem", color: "rgba(190, 30, 73, 0.3)" }}>
            Already have an account?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
