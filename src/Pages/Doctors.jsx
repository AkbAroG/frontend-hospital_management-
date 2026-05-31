import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  const departmentsArray = [
    "All",
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const filteredDoctors = department === "All" 
    ? doctors 
    : doctors.filter(doc => doc.doctorDepartment === department);

  return (
    <div className="page">
      <Hero title={"Our Professional Doctors"} imageUrl={"/doctors.png"} />
      <div className="doctors-container">
        <div className="find-doctor-header">
          <h2>Find Your Doctor</h2>
          <div className="filter-wrapper">
            <label>Select Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              {departmentsArray.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="doctors-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div key={doc._id} className="doctor-card">
                <img src={doc.docAvatar && doc.docAvatar.url} alt="doctor" />
                <h4>{`${doc.firstName} ${doc.lastName}`}</h4>
                <p>{doc.doctorDepartment}</p>
                <Link to={`/doctor/${doc._id}`} className="btn">View Profile</Link>
              </div>
            ))
          ) : (
            <p>No doctors found in this department.</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .doctors-container {
          padding: 50px 10%;
        }
        .find-doctor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .filter-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .filter-wrapper label {
          font-weight: bold;
          color: #271776;
        }
        .filter-wrapper select {
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          border: 1px solid #ddd;
          outline: none;
          background: #fff;
        }
        .doctors-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .doctor-card {
          border: 1px solid #ddd;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
          transition: 0.3s;
        }
        .doctor-card:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .doctor-card img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 15px;
        }
        .doctor-card h4 {
          margin-bottom: 5px;
        }
        .doctor-card p {
          color: #666;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default Doctors;
