import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/doctors",
          { withCredentials: true }
        );
        const doc = data.doctors.find((d) => d._id === id);
        setDoctor(doc);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <Hero title={`${doctor.firstName} ${doctor.lastName}`} imageUrl={doctor.docAvatar && doctor.docAvatar.url} />
      <div className="doctor-profile-container">
        <div className="profile-details">
          <div className="detail-item">
            <strong>Specialization:</strong> {doctor.doctorDepartment}
          </div>
          <div className="detail-item">
            <strong>Qualification:</strong> {doctor.qualification || "M.D."}
          </div>
          <div className="detail-item">
            <strong>Experience:</strong> {doctor.experience || "10+ Years"}
          </div>
          <div className="detail-item">
            <strong>Available Timings:</strong> {doctor.availableTimings || "9:00 AM - 5:00 PM"}
          </div>
          <div className="detail-item">
            <strong>Consultation Fee:</strong> ${doctor.consultationFee || 50}
          </div>
          <div className="actions">
            <Link to="/appointment" className="btn">Book Now</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .doctor-profile-container {
          padding: 50px 10%;
          display: flex;
          justify-content: center;
        }
        .profile-details {
          width: 100%;
          max-width: 600px;
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .detail-item {
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        .detail-item strong {
          color: #271776;
        }
        .actions {
          margin-top: 30px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default DoctorProfile;
