import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import AdminRegister from "./Pages/AdminRegister";
import AdminDashboard from "./Pages/AdminDashboard";
import PaymentPage from "./Pages/PaymentPage";
import MyAppointments from "./Pages/MyAppointments";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import Doctors from "./Pages/Doctors";
import DoctorProfile from "./Pages/DoctorProfile";
import LabReports from "./Pages/LabReports";
import Emergency from "./Pages/Emergency";
import ChatBot from "./components/ChatBot";



const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/lab-reports" element={<LabReports />} />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
        <ChatBot />
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
