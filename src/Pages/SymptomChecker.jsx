import React, { useState } from "react";
import Hero from "../components/Hero";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const checkSymptoms = () => {
    const s = symptoms.toLowerCase();
    if (s.includes("heart") || s.includes("chest pain") || s.includes("breath")) {
      setResult("You should consult the Cardiology department.");
    } else if (s.includes("brain") || s.includes("headache") || s.includes("dizzy")) {
      setResult("You should consult the Neurology department.");
    } else if (s.includes("bone") || s.includes("fracture") || s.includes("joint")) {
      setResult("You should consult the Orthopedics department.");
    } else if (s.includes("skin") || s.includes("rash") || s.includes("itch")) {
      setResult("You should consult the Dermatology department.");
    } else if (s.includes("child") || s.includes("baby") || s.includes("fever")) {
      setResult("You should consult the Pediatrics department.");
    } else {
      setResult("Please consult a general physician for initial checkup.");
    }
  };

  return (
    <div className="page">
      <Hero title={"AI Symptom Checker"} imageUrl={"/symptoms.png"} />
      <div className="symptom-container">
        <div className="checker-card">
          <h2>How are you feeling?</h2>
          <p>Enter your symptoms below to get a recommendation on which department to visit.</p>
          <textarea
            placeholder="e.g., I have chest pain and shortness of breath..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button onClick={checkSymptoms} className="btn">Check Now</button>
          {result && (
            <div className="result-box">
              <h3>Recommendation:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .symptom-container {
          padding: 50px 10%;
          display: flex;
          justify-content: center;
        }
        .checker-card {
          width: 100%;
          max-width: 700px;
          background: #fff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          text-align: center;
        }
        .checker-card textarea {
          width: 100%;
          height: 150px;
          margin: 20px 0;
          padding: 15px;
          font-size: 1.1rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          resize: none;
        }
        .result-box {
          margin-top: 30px;
          padding: 20px;
          background: #f0f7ff;
          border-radius: 10px;
          border-left: 5px solid #271776;
        }
      `}</style>
    </div>
  );
};

export default SymptomChecker;
