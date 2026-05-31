import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(Context);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setAdminData(response.data.user);
      } catch (error) {
        toast.error("Failed to fetch admin data");
        navigate("/login");
      }
    };

    if (isAuthenticated && user?.role === "Admin") {
      fetchAdminData();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (!adminData) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1>Admin Dashboard</h1>
          <hr />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Information</h5>
              <p className="card-text">
                <strong>Name:</strong> {adminData.firstName} {adminData.lastName}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {adminData.email}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {adminData.phone}
              </p>
              <p className="card-text">
                <strong>NIC:</strong> {adminData.nic}
              </p>
              <p className="card-text">
                <strong>Gender:</strong> {adminData.gender}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <button className="btn btn-info btn-block mb-2 w-100">
                View Appointments
              </button>
              <button className="btn btn-warning btn-block mb-2 w-100">
                Manage Doctors
              </button>
              <button className="btn btn-success btn-block mb-2 w-100">
                View Users
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Account</h5>
              <button className="btn btn-primary btn-block mb-2 w-100">
                Edit Profile
              </button>
              <button className="btn btn-warning btn-block mb-2 w-100">
                Change Password
              </button>
              <button
                className="btn btn-danger btn-block"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
