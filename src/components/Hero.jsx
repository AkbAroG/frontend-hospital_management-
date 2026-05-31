import React from "react";
import { Link } from "react-router-dom";


const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            AWSM Care Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            AWSM Care, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <Link to="/lab-reports" className="btn purple-btn">Lab Reports</Link>
            <Link to="/emergency" className="btn white-btn" style={{ border: "1px solid #9083d5" }}>Emergency Services</Link>
          </div>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
