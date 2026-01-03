import api from "../api/axios";

export default function EmployeeDashboard() {
  const checkIn = async () => {
    await api.post("/attendance/check-in");
    alert("Checked in");
  };

  const checkOut = async () => {
    await api.post("/attendance/check-out");
    alert("Checked out");
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>
    </div>
  );
}
