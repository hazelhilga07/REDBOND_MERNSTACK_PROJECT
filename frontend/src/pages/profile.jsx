// pages/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/"); // redirect to landing page
  };

  return (
    <div className="landing-container">
      <div className="landing-frame">
        <h1 className="landing-title">User Profile</h1>

        <div className="landing-card profile-card">
          <div className="profile-details">
            <p><strong>Name:</strong> {user?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user?.address || "N/A"}</p>
            <p><strong>Pincode:</strong> {user?.pincode || "N/A"}</p>
            <p><strong>Blood Group:</strong> {user?.bloodGroup || "N/A"}</p>
          </div>

          <div className="button-group" style={{ marginTop: "1.5rem" }}>
            <button onClick={handleLogout} className="button-secondary">
              Logout
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="button-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
