import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Hero from "../components/Hero";

const LabReports = () => {
  const [reports, setReports] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/labreport/myreports",
          { withCredentials: true }
        );
        setReports(data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="page">
      <Hero title={"My Lab Reports"} imageUrl={"/labreports.png"} />
      <div className="reports-container">
        {reports.length > 0 ? (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.testName}</td>
                  <td>{report.description}</td>
                  <td><span className={`status-${report.status.toLowerCase()}`}>{report.status}</span></td>
                  <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a href={report.reportFile.url} target="_blank" rel="noreferrer" className="btn-small">Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No lab reports found.</p>
        )}
      </div>
      <style jsx>{`
        .reports-container {
          padding: 50px 10%;
        }
        .reports-table {
          width: 100%;
          border-collapse: collapse;
        }
        .reports-table th, .reports-table td {
          border: 1px solid #ddd;
          padding: 15px;
          text-align: left;
        }
        .reports-table th {
          background-color: #f2f2f2;
        }
        .status-completed {
          color: green;
          font-weight: bold;
        }
        .status-pending {
          color: orange;
          font-weight: bold;
        }
        .btn-small {
          background: #271776;
          color: white;
          padding: 5px 10px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default LabReports;
