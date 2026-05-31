import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Hero from "../components/Hero";

const Emergency = () => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/emergency/stats");
        setStats(data.stats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  const handleAmbulanceRequest = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/emergency/ambulance/request",
        { patientName, phone, location },
        { withCredentials: true }
      );
      toast.success(data.message);
      setPatientName("");
      setPhone("");
      setLocation("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="page">
      <Hero title={"Emergency Services"} imageUrl={"/emergency.png"} />
      <div className="emergency-container">
        <div className="emergency-info">
          <div className="info-card">
            <h3>Emergency Helpline</h3>
            <p className="helpline">{stats ? stats.emergencyHelpline : "911"}</p>
          </div>
          <div className="info-card">
            <h3>ICU Availability</h3>
            <p className="count">{stats ? stats.icuAvailability : "0"} Beds Free</p>
          </div>
          <div className="info-card">
            <h3>Blood Bank</h3>
            {stats && stats.bloodBankInfo.length > 0 ? (
              <ul>
                {stats.bloodBankInfo.map((b, i) => (
                  <li key={i}>{b.bloodGroup}: {b.unitsAvailable} Units</li>
                ))}
              </ul>
            ) : (
              <p>O+: 10 Units, A+: 5 Units...</p>
            )}
          </div>
        </div>

        <div className="ambulance-request">
          <h2>Request an Ambulance</h2>
          <form onSubmit={handleAmbulanceRequest}>
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Current Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" className="btn">Request Now</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .emergency-container {
          padding: 50px 10%;
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .emergency-info {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .info-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .helpline {
          font-size: 2.5rem;
          color: #d9534f;
          font-weight: bold;
        }
        .count {
          font-size: 1.5rem;
          color: #5bc0de;
        }
        .ambulance-request {
          flex: 1;
          background: #fdfdfd;
          padding: 30px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
        .ambulance-request h2 {
          margin-bottom: 20px;
          color: #271776;
        }
        .ambulance-request form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .ambulance-request input, .ambulance-request textarea {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Emergency;
