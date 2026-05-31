import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ price, appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Get client secret from backend
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/payment/create-payment-intent",
        { amount: price },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const clientSecret = data.clientSecret;

      // 2. Confirm card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
        setIsProcessing(false);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          // 3. Update appointment payment status
          await axios.put(
            `http://localhost:5000/api/v1/payment/update-status/${appointmentId}`,
            {
              paymentId: paymentResult.paymentIntent.id,
              status: "Paid",
              amount: price,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          
          toast.success("Payment successful! Your appointment is confirmed.");
          setIsProcessing(false);
          navigate("/"); // Redirect home
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during payment"
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form" style={{ marginTop: "30px" }}>
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "20px", backgroundColor: "#f9f9f9" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        onClick={handlePayment}
        disabled={isProcessing || !stripe}
        style={{ width: "100%", padding: "12px", fontSize: "16px", fontWeight: "bold" }}
      >
        {isProcessing ? "Processing..." : `PAY $${price}`}
      </button>
    </div>
  );
};

export default PaymentForm;
