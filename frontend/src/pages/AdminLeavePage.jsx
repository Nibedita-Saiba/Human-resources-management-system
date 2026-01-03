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
    <div>
      <h2>Leave Approvals</h2>

      {leaves.map((l) => (
        <div key={l._id}>
          <p>
            {l.leaveType} | {l.startDate} → {l.endDate} | <b>{l.status}</b>
          </p>

          {l.status === "Pending" && (
            <>
              <button onClick={() => updateLeave(l._id, "Approved")}>
                Approve
              </button>
              <button onClick={() => updateLeave(l._id, "Rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
