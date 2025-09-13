// pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import donationIllustration from "./donation-illustration.jpg"; // ✅ Import the image

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [navigate, user, token]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="app-name">REDBOND</h1>
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
        >
          {user?.name || "Profile"}
        </button>
      </header>

      {/* Branding */}
      <section className="logo-section">
        <div className="logo">
          <section className="image-section">
            {/* ✅ Use imported illustration */}
            <img 
              src={donationIllustration} 
              alt="Blood Donation Illustration" 
              className="dashboard-image"
            />
          </section>
          <span role="img" aria-label="blood-drop">🩸</span>
        </div>
        <h2 className="app-title">BloodLink </h2>
        <p className="subtitle">Be the link between life and hope</p>
      </section>

      {/* Actions */}
      <div className="button-section">
        <button
          className="main-btn donate-btn"
          onClick={() => navigate("/donate")}
        >
          Donate Blood
        </button>
        <button
          className="main-btn need-btn"
          onClick={() => navigate("/request-blood")}
        >
          Need Blood
        </button>
      </div>
    </div>
  );
}