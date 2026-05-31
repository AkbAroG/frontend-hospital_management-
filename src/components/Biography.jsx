import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography" style={{ 
      display: "flex", 
      gap: "60px", 
      padding: "60px 10%", 
      alignItems: "center",
      background: "#fff",
      margin: "40px auto",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      overflow: "hidden"
    }}>
      <div className="banner" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img src={imageUrl} alt="whoweare" style={{ 
          width: "100%", 
          height: "auto",
          maxWidth: "500px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(57, 57, 217, 0.2)",
          display: "block"
        }} />
      </div>
      <div className="banner" style={{ flex: 1.2 }}>
        <p style={{ 
          color: "#3939d9", 
          fontWeight: "bold", 
          textTransform: "uppercase", 
          letterSpacing: "2px",
          marginBottom: "10px"
        }}>About AWSM Care</p>
        <h3 style={{ fontSize: "36px", marginBottom: "25px", color: "#111" }}>Providing World-Class Healthcare With Compassion</h3>
        <p style={{ lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
          AWSM Care Medical Institute was founded with a single mission: to provide the highest quality medical care to our community. 
          Our state-of-the-art facility is equipped with the latest technology and staffed by world-renowned specialists dedicated 
          to your well-being.
        </p>
        <p style={{ lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
          We believe that healthcare should be personalized, accessible, and compassionate. From our emergency services to our 
          specialized clinics, every patient is treated with the dignity and respect they deserve. We don't just treat illnesses; 
          we care for people.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
          <div style={{ padding: "15px", borderLeft: "4px solid #3939d9", background: "#f8f9ff" }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#3939d9" }}>24/7 Service</h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Always here when you need us.</p>
          </div>
          <div style={{ padding: "15px", borderLeft: "4px solid #3939d9", background: "#f8f9ff" }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#3939d9" }}>Expert Doctors</h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Over 50+ specialized medical experts.</p>
          </div>
          <div style={{ padding: "15px", borderLeft: "4px solid #3939d9", background: "#f8f9ff" }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#3939d9" }}>Modern Lab</h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>High-precision diagnostic equipment.</p>
          </div>
          <div style={{ padding: "15px", borderLeft: "4px solid #3939d9", background: "#f8f9ff" }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#3939d9" }}>Patient First</h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Your recovery is our top priority.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
