import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import Hero from "../components/Hero";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const departmentPrices = {
  "Pediatrics": 50,
  "Orthopedics": 120,
  "Cardiology": 150,
  "Neurology": 200,
  "Oncology": 250,
  "Radiology": 80,
  "Physical Therapy": 60,
  "Dermatology": 90,
  "ENT": 70,
};

const PaymentPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    // Check if we have the department from the router state
    if (!location.state || !location.state.department) {
      // If no state, they probably refreshed. We'd usually fetch the appointment from backend here.
      // For now, redirect to home if no data.
      navigate("/");
      return;
    }

    const dept = location.state.department;
    setDepartment(dept);
    
    // Set dynamic price based on department
    const deptPrice = departmentPrices[dept] || 50; // Default to 50 if not found
    setPrice(deptPrice);
  }, [location, navigate]);

  return (
    <>
      <Hero
        title={"Complete Your Payment | AWSM Care Medical Institute"}
        imageUrl={"/about.png"}
      />
      <div className="container form-component">
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px", backgroundColor: "#fff" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#271776ca" }}>Payment Summary</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span><strong>Service Department:</strong></span>
            <span>{department} Consultation</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", padding: "15px 0", borderBottom: "2px solid #271776ca", color: "#271776ca" }}>
            <span><strong>Total Amount:</strong></span>
            <span><strong>${price}</strong></span>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm price={price} appointmentId={id} />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
