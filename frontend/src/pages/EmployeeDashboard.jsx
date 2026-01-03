import { useState } from "react";
import api from "../api/axios";

export default function EmployeeDashboard() {
  const [status, setStatus] = useState("");

  const checkIn = async () => {
    try {
      await api.post("/attendance/check-in");
      setStatus("Checked in successfully");
    } catch (error) {
      alert("You have already checked in today");
    }
  };

  const checkOut = async () => {
    try {
      await api.post("/attendance/check-out");
      setStatus("Checked out successfully");
    } catch (error) {
      alert("Please check in first");
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>

      {status && <p>Status: {status}</p>}
    </div>
  );
}
