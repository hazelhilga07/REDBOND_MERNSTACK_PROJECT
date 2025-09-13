// LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="landing-container">
      {/* Floating blood drops */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="blood-drop"></div>
      ))}

      {/* Centered Frame */}
      <div className="landing-frame">
        {/* Heading */}
        <h1 className="landing-title">
          Find Blood Donors Fast! <br /> Save Lives With a Tap.
        </h1>

        {/* Card */}
        <div className="landing-card">
          {/* Heart Logo */}
          <div className="logo-circle">
            <span className="heart">❤️</span>
          </div>

          {/* Title & Description */}
          <h2 className="card-title">Welcome to RedBond</h2>
          <p className="card-desc">
            India’s community for lifesavers. Donate, request, and connect—all in one app.
          </p>

          {/* Buttons */}
          <div className="button-group">
            <button onClick={() => navigate("/register")} className="button-primary">
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} className="button-secondary">
              Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="footer-text">
          Made with ❤️ for India’s blood heroes
        </p>
      </div>
    </div>
  );
}
