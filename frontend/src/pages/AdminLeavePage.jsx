import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminLeavePage() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await api.get("/leave/all");
    setLeaves(res.data);
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

        /* PAGE CENTERING */
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
          align-items: start;
        }

        .page-title {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #111827;
        }

        /* LEFT CARD */
        .card {
          background: #ffffff;
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

        .info {
          font-size: 15px;
          font-weight: 500;
          color: #111827;
        }

        .dates {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #111827;
        }

        .Pending {
          background: #fde68a;
        }

        .Approved {
          background: #dcfce7;
        }

        .Rejected {
          background: #fee2e2;
        }

        .btn {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .approve {
          background: #22c55e;
          color: #000;
        }

        .reject {
          background: #ef4444;
          color: #000;
        }

        .empty {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }

        /* IMAGE */
        .image-box img {
          width: 100%;
          border-radius: 18px;
          object-fit: contain;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
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

          {/* LEFT: APPROVAL LIST */}
          <div className="card">
            {leaves.length === 0 && (
              <div className="empty">No leave requests found.</div>
            )}

            {leaves.map((l) => (
              <div className="leave-item" key={l._id}>
                <div>
                  <div className="info">{l.leaveType}</div>
                  <div className="dates">
                    {l.startDate} → {l.endDate}
                  </div>
                </div>

                <div className="actions">
                  <span className={`status ${l.status}`}>
                    {l.status}
                  </span>

                  {l.status === "Pending" && (
                    <>
                      <button
                        className="btn approve"
                        onClick={() => updateLeave(l._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() => updateLeave(l._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: IMAGE */}
          <div className="image-box">
            <img
              src="https://www.timelabs.in/images/LeaveManagement/what_is_leave_management.png"
              alt="Leave Management Illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}
