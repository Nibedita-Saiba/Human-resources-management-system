import { useState, useEffect } from "react";
import api from "../api/axios";

export default function LeavePage() {
  const [leaveType, setLeaveType] = useState("Paid");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await api.get("/leave/my");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const applyLeave = async () => {
    if (!startDate || !endDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/leave/apply", {
      leaveType,
      startDate,
      endDate,
      reason,
    });

    alert("Leave applied successfully");
    setReason("");
    fetchLeaves();
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #f5f6fa;
          font-family: Inter, sans-serif;
        }

        .leave-page {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .page-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #111827;
        }

        .leave-row {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .leave-left,
        .leave-right {
          flex: 1;
        }

        .card {
          background: #ffffff;
          padding: 26px;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #111827;
        }

        select,
        input,
        textarea {
          width: 100%;
          margin-bottom: 14px;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;

          /* 🔥 IMPORTANT FIX */
          background-color: #ffffff;
          color: #111827;
        }

        input::placeholder,
        textarea::placeholder {
          color: #6b7280;
        }

        select:focus,
        input:focus,
        textarea:focus {
          outline: none;
          border-color: #4f46e5;
          background-color: #ffffff;
        }


        select:focus,
        input:focus,
        textarea:focus {
          outline: none;
          border-color: #4f46e5;
        }

        textarea {
          height: 90px;
          resize: none;
        }

        .apply-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #4f46e5;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .apply-btn:hover {
          background: #4338ca;
        }

        /* LEAVE ITEM */
        .leave-item {
          background: #f9fafb;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: #111827; /* 🔥 FORCE VISIBILITY */
        }

        .leave-text {
          font-weight: 600;
          color: #111827;
        }

        .leave-dates {
          font-weight: 500;
          color: #374151;
        }

        /* STATUS BADGE */
        .status {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }

        .PENDING {
          background: #fde68a;
        }

        .APPROVED {
          background: #86efac;
        }

        .REJECTED {
          background: #fca5a5;
        }

        @media (max-width: 900px) {
          .leave-row {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="leave-page">
        <div className="page-title">Leave Management</div>

        <div className="leave-row">
          {/* APPLY LEAVE */}
          <div className="leave-left">
            <div className="card">
              <div className="card-title">Apply Leave</div>

              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option>Paid</option>
                <option>Sick</option>
                <option>Unpaid</option>
              </select>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <textarea
                placeholder="Reason for leave"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <button className="apply-btn" onClick={applyLeave}>
                Apply Leave
              </button>
            </div>
          </div>

          {/* MY LEAVES */}
          <div className="leave-right">
            <div className="card">
              <div className="card-title">My Leave Requests</div>

              {leaves.length === 0 && (
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  No leave requests found.
                </p>
              )}

              {leaves.map((l) => (
                <div className="leave-item" key={l._id}>
                  <div>
                    <span className="leave-text">
                      {l.leaveType || "Paid"}
                    </span>
                    <span className="leave-dates">
                      {" "} | {l.startDate} → {l.endDate}
                    </span>
                  </div>

                  <span className={`status ${l.status.toUpperCase()}`}>
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
