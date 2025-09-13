// pages/RequestBlood.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import "../App.css";

export default function RequestBlood() {
  const [donors, setDonors] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch donors immediately
  useEffect(() => {
    const fetchDonors = async () => {
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
  }, [token]);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Available Donors</h1>

      {donors.length > 0 ? (
        <div className="donor-list">
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
      ) : (
        <p>No donors available at the moment.</p>
      )}

      <Button onClick={() => navigate("/dashboard")} className="back-btn">
        &larr; Back to Dashboard
      </Button>
    </div>
  );
}
