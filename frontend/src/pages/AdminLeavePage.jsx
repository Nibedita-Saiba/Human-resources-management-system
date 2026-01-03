import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminLeavePage() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await api.get("/leave/all");
    setLeaves(res.data); // ✅ FIXED
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateLeave = async (id, status) => {
    await api.put(`/leave/update/${id}`, { status });
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

        /* PAGE LAYOUT */
        .leave-approval-page {
          min-height: calc(100vh - 70px);
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .leave-wrapper {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .page-title {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #111827;
        }

        /* LEFT CARD */
        .card {
          background: white;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }

        .leave-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 16px;
          background: #f9fafb;
        }

        .leave-info {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .leave-info span {
          display: block;
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* STATUS */
        .status {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #111827; /* ✅ TEXT BLACK */
        }

        .PENDING {
          background: #fde68a;
        }

        .APPROVED {
          background: #bbf7d0;
        }

        .REJECTED {
          background: #fecaca;
        }

        /* BUTTONS */
        .btn {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .approve {
          background: #16a34a;
          color: white;
        }

        .reject {
          background: #dc2626;
          color: white;
        }

        /* RIGHT IMAGE */
        .image-box img {
          width: 100%;
          max-height: 420px;
          object-fit: contain;
          border-radius: 18px;
        }

        .empty {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }

        @media (max-width: 900px) {
          .leave-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="leave-approval-page">
        <div className="leave-wrapper">
          <div className="page-title">Leave Approvals</div>

          {/* LEFT SIDE */}
          <div className="card">
            {leaves.length === 0 && (
              <div className="empty">No leave requests found.</div>
            )}

            {leaves.map((l) => (
              <div className="leave-item" key={l._id}>
                <div className="leave-info">
                  {l.leaveType} | {l.startDate} → {l.endDate}
                  <span>Employee ID: {l.employeeId || "N/A"}</span>
                </div>

                <div className="right-actions">
                  <span className={`status ${l.status}`}>
                    {l.status}
                  </span>

                  {l.status === "PENDING" && (
                    <>
                      <button
                        className="btn approve"
                        onClick={() => updateLeave(l._id, "APPROVED")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() => updateLeave(l._id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="image-box">
            <img
              src="https://www.timelabs.in/images/LeaveManagement/what_is_leave_management.png"
              alt="Leave Management"
            />
          </div>
        </div>
      </div>
    </>
  );
}
