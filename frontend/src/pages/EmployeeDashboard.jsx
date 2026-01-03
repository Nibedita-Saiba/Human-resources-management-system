import { useState } from "react";
import api from "../api/axios";

export default function EmployeeDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);

  const checkIn = async () => {
    try {
      await api.post("/attendance/check-in");
      setCheckedIn(true);
    } catch {
      alert("You have already checked in today");
    }
  };

  const checkOut = async () => {
    try {
      await api.post("/attendance/check-out");
      setCheckedIn(false);
    } catch {
      alert("Please check in first");
    }
  };

  return (
    <>
      <style>{`
        body {
          background: #f5f6fa;
        }

        .dashboard-page {
          padding: 40px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 30px;
        }

        /* MAIN LAYOUT */
        .dashboard-layout {
          display: flex;
          align-items: flex-start;
          gap: 40px;
        }

        /* LEFT CONTENT (CARDS) */
        .dashboard-cards {
          width: 420px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          z-index: 2;
        }

        /* RIGHT IMAGE */
        .dashboard-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dashboard-image img {
          max-width: 100%;
          height: auto;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        /* CARD */
        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 26px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          text-align: center;
        }

        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 14px;
        }

        .status-value {
          font-size: 22px;
          font-weight: 700;
        }

        .red {
          color: #dc2626;
        }

        .green {
          color: #16a34a;
        }

        .blue {
          color: #4f46e5;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
        }

        .btn-primary {
          background: #4f46e5;
          color: white;
        }

        .btn-dark {
          background: #111827;
          color: white;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .dashboard-layout {
            flex-direction: column;
          }

          .dashboard-cards {
            width: 100%;
          }

          .dashboard-image {
            margin-top: 20px;
          }
        }
      `}</style>

      <div className="dashboard-page">
        <div className="dashboard-title">Employee Dashboard</div>

        <div className="dashboard-layout">
          {/* LEFT: CARDS */}
          <div className="dashboard-cards">
            <div className="card">
              <div className="card-title">Today Status</div>
              <div
                className={`status-value ${
                  checkedIn ? "green" : "red"
                }`}
              >
                {checkedIn ? "Checked In" : "Not Checked In"}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Attendance</div>
              <div className="status-value blue">Active</div>
            </div>

            <div className="card">
              <div className="card-title">Attendance Actions</div>

              <button
                className="btn btn-primary"
                onClick={checkIn}
                disabled={checkedIn}
              >
                Check In
              </button>

              <button
                className="btn btn-dark"
                onClick={checkOut}
                disabled={!checkedIn}
              >
                Check Out
              </button>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="dashboard-image">
            <img
              src="https://softhealer.com/theme_softhealer_website/static/src/img/images/hrms/about.webp"
              alt="HRMS Illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}
