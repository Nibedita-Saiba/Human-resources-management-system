import { useState, useEffect } from "react";
import api from "../api/axios";

export default function LeavePage() {
  const [leaveType, setLeaveType] = useState("Paid");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);

  // Fetch my leaves
  const fetchLeaves = async () => {
    const res = await api.get("/leave/my");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Apply leave
  const applyLeave = async () => {
    await api.post("/leave/apply", {
      leaveType,
      startDate,
      endDate,
      reason,
    });
    alert("Leave applied");
    fetchLeaves();
  };

  return (
    <div>
      <h2>Apply Leave</h2>

      <select onChange={(e) => setLeaveType(e.target.value)}>
        <option>Paid</option>
        <option>Sick</option>
        <option>Unpaid</option>
      </select>

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <input placeholder="Reason" onChange={(e) => setReason(e.target.value)} />

      <button onClick={applyLeave}>Apply Leave</button>

      <hr />

      <h3>My Leave Requests</h3>
      {leaves.map((l) => (
        <div key={l._id}>
          <p>
            {l.leaveType} | {l.startDate} → {l.endDate} | <b>{l.status}</b>
          </p>
        </div>
      ))}
    </div>
  );
}
