import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const checkSymptoms = () => {
    const s = symptoms.toLowerCase();
    if (s.includes("heart") || s.includes("chest pain") || s.includes("breath")) {
      setResult("Recommendation: Cardiology Department");
    } else if (s.includes("brain") || s.includes("headache") || s.includes("dizzy")) {
      setResult("Recommendation: Neurology Department");
    } else if (s.includes("bone") || s.includes("fracture") || s.includes("joint")) {
      setResult("Recommendation: Orthopedics Department");
    } else if (s.includes("skin") || s.includes("rash") || s.includes("itch")) {
      setResult("Recommendation: Dermatology Department");
    } else if (s.includes("child") || s.includes("baby") || s.includes("fever")) {
      setResult("Recommendation: Pediatrics Department");
    } else if (s.includes("eye") || s.includes("vision")) {
      setResult("Recommendation: Ophthalmology Department");
    } else {
      setResult("Recommendation: General Physician");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="floating-bot-btn" onClick={() => setIsOpen(!isOpen)}>
        <img src="/robot.png" alt="robot" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
      </div>


      {/* Popup / Modal */}
      {isOpen && (
        <div className="bot-popup">
          <div className="bot-header">
            <h3>AI Symptom Checker</h3>
            <FaTimes onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }} />
          </div>
          <div className="bot-content">
            <p>Describe your symptoms (e.g., chest pain, headache):</p>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Type here..."
            />
            <button onClick={checkSymptoms} className="btn">Analyze</button>
            {result && (
              <div className="bot-result">
                <strong>{result}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .floating-bot-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #271776, #9083d5);
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          z-index: 9999;
          transition: transform 0.3s;
        }
        .floating-bot-btn:hover {
          transform: scale(1.1);
        }
        .bot-popup {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 320px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 10000;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .bot-header {
          background: #271776;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bot-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .bot-content textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          resize: none;
        }
        .bot-result {
          margin-top: 10px;
          padding: 10px;
          background: #f0f7ff;
          border-left: 4px solid #271776;
          color: #271776;
        }
        .bot-content button {
          background: #271776;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
