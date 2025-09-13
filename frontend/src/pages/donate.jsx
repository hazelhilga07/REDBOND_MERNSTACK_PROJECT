// pages/Donate.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import "../App.css";

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    bloodGroup: "",
    dob: "",
    location: "",
    units: "",
    available: true,
    note: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/donors",
        {
          ...formData,
          units: Number(formData.units),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Donor registered successfully!");
      navigate("/DonorDashboard"); // navigate to DonorDashboard
    } catch (error) {
      console.error(error);
      alert("Failed to register donor");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Register as a Blood Donor</h1>
        
      </div>

      {/* Donor Form */}
      <form className="request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="units"
          placeholder="Units you can donate"
          value={formData.units}
          onChange={handleChange}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available for donation
        </label>

        <Button type="submit" className="accept-btn">
          Register as Donor
        </Button>
      </form>
      <Button onClick={() => navigate("/dashboard")} className="back-btn">
          &larr; Back to Dashboard
        </Button>
    </div>
  );
}
