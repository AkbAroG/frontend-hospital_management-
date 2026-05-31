import React from "react";
import { FaUserMd, FaHeartbeat, FaHospitalAlt, FaFlask } from "react-icons/fa";

const Values = () => {
  const values = [
    {
      icon: <FaUserMd />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our medical practices and patient interactions."
    },
    {
      icon: <FaHeartbeat />,
      title: "Compassion",
      description: "We treat every patient with empathy, understanding, and kindness throughout their healing journey."
    },
    {
      icon: <FaHospitalAlt />,
      title: "Excellence",
      description: "We strive for perfection in healthcare delivery through continuous learning and innovation."
    },
    {
      icon: <FaFlask />,
      title: "Innovation",
      description: "We leverage cutting-edge technology and research to provide the best possible medical outcomes."
    }
  ];

  return (
    <div className="container" style={{ padding: "60px 100px", background: "#f8f9ff" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <p style={{ color: "#3939d9", fontWeight: "bold", textTransform: "uppercase" }}>Our Core Values</p>
        <h2 style={{ fontSize: "32px", color: "#111" }}>What Drives AWSM Care</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
        {values.map((v, i) => (
          <div key={i} style={{ 
            background: "#fff", 
            padding: "40px 30px", 
            borderRadius: "15px", 
            textAlign: "center",
            boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
            transition: "transform 0.3s ease"
          }}>
            <div style={{ 
              fontSize: "40px", 
              color: "#3939d9", 
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center"
            }}>{v.icon}</div>
            <h4 style={{ marginBottom: "15px", color: "#111" }}>{v.title}</h4>
            <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
