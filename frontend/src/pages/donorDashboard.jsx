// pages/DonorDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DonorDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Blood Requests</h1>

      {requests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Location</th>
              <th>Required Date</th>
              <th>Critical</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.patientName}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.units}</td>
                <td>{r.location}</td>
                <td>{new Date(r.requiredDate).toLocaleDateString()}</td>
                <td>{r.critical ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/dashboard")} className="back-btn">
        &larr; Back to Dashboard
      </button>
    </div>
  );
}
