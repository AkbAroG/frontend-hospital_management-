import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, user } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/appointment/me",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleCancel = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/appointment/cancel/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setAppointments((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: "Rejected" } : app))
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD HH:MM):");
    if (!newDate) return;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/appointment/reschedule/${id}`,
        { appointment_date: newDate },
        { withCredentials: true }
      );
      toast.success(data.message);
      setAppointments((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, appointment_date: newDate, status: "Pending" } : app
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const downloadReceipt = (appointment) => {
    try {
      const doc = new jsPDF();

      // Add Hospital Logo or Name
      doc.setFontSize(22);
      doc.setTextColor(57, 57, 217); // #3939d9
      doc.text("AWSM CARE MEDICAL INSTITUTE", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text("Official Appointment Receipt", 105, 30, { align: "center" });
      doc.line(20, 35, 190, 35);

      // Patient Details
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Patient Name: ${appointment.firstName} ${appointment.lastName}`, 20, 45);
      doc.text(`Email: ${appointment.email}`, 20, 52);
      doc.text(`Phone: ${appointment.phone}`, 20, 59);
      doc.text(`NIC: ${appointment.nic}`, 20, 66);

      // Appointment Details
      autoTable(doc, {
        startY: 75,
        head: [["Description", "Details"]],
        body: [
          ["Doctor", `${appointment.doctor.firstName} ${appointment.doctor.lastName}`],
          ["Department", appointment.department],
          ["Appointment Date", appointment.appointment_date.substring(0, 16)],
          ["Status", appointment.status],
          ["Payment Status", appointment.paymentInfo?.status || "Pending"],
          ["Amount Paid", `$${appointment.paymentInfo?.amount || 0}`],
        ],
        headStyles: { fillColor: [57, 57, 217] },
        theme: "grid",
      });

      // Footer
      const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 150;
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text("This is a computer generated receipt.", 105, finalY + 15, { align: "center" });
      doc.text("Thank you for choosing AWSM Care Medical Institute!", 105, finalY + 22, { align: "center" });
      
      doc.save(`AWSMCare_Receipt_${appointment._id}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="container page" style={{ marginTop: "120px", minHeight: "80vh" }}>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>My Appointments</h2>
      {appointments && appointments.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Doctor</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Department</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Payment</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {appointment.appointment_date.substring(0, 16)}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {appointment.department}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <span style={{
                      color: appointment.status === "Accepted" ? "green" : appointment.status === "Rejected" ? "red" : "orange",
                      fontWeight: "bold"
                    }}>
                      {appointment.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <span style={{
                      color: appointment.paymentInfo?.status === "Paid" ? "green" : "red",
                      fontWeight: "bold"
                    }}>
                      {appointment.paymentInfo?.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd", display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => downloadReceipt(appointment)}
                      style={{ padding: "5px 10px", backgroundColor: "#3939d9", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Receipt
                    </button>
                    {appointment.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleReschedule(appointment._id)}
                          style={{ padding: "5px 10px", backgroundColor: "#5bc0de", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          style={{ padding: "5px 10px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p>You have no appointments yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
