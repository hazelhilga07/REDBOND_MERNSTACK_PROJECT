// pages/RequestBlood.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import "../App.css";

export default function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: "",
    attendeeMobile: "",
    bloodGroup: "",
    requiredDate: "",
    units: "",
    location: "",
    critical: false,
    note: "",
  });

  const [donors, setDonors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate 10-digit mobile number
    if (!/^\d{10}$/.test(formData.attendeeMobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      // Submit blood request
      await axios.post(
        "http://localhost:8080/api/requests",
        { ...formData, units: Number(formData.units) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blood request submitted successfully!");
      setSubmitted(true); // mark as submitted
    } catch (error) {
      console.error(error);
      alert("Failed to submit request");
    }
  };

  // Fetch donors after submitting the request
  useEffect(() => {
    const fetchDonors = async () => {
      if (!submitted) return; // only fetch after form submission
      try {
        const res = await axios.get("http://localhost:8080/api/donors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDonors();
  }, [submitted, token]);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Request for Blood</h1>

      {/* Blood Request Form */}
      <form className="request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="attendeeMobile"
          placeholder="Attendee Mobile (10 digits)"
          value={formData.attendeeMobile}
          onChange={handleChange}
          pattern="\d{10}"
          maxLength={10}
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
          name="requiredDate"
          value={formData.requiredDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="units"
          placeholder="Units needed"
          value={formData.units}
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
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="critical"
            checked={formData.critical}
            onChange={handleChange}
          />
          Critical
        </label>
        <textarea
          name="note"
          placeholder="Additional note"
          value={formData.note}
          onChange={handleChange}
        />
        <Button type="submit" className="accept-btn">
          Submit Request
        </Button>
      </form>

      {/* Show donors after submission */}
      {submitted && donors.length > 0 && (
        <div className="donor-list">
          <h2>Available Donors</h2>
          <table className="request-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Location</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.mobile}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.units}</td>
                  <td>{d.location}</td>
                  <td>{d.available ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button onClick={() => navigate("/dashboard")} className="back-btn">
        &larr; Back to Dashboard
      </Button>
    </div>
  );
}
