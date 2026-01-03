import React, { useState } from "react";

const Attendance = () => {
  const [status, setStatus] = useState("Present");
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setCheckedIn(true);
    alert("Checked In Successfully");
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    alert("Checked Out Successfully");
  };

  return (
    <div style={styles.container}>
      <h2>Attendance Management</h2>

      {/* Date */}
      <p><strong>Date:</strong> {new Date().toDateString()}</p>

      {/* Status */}
      <div style={styles.card}>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.select}
        >
          <option>Present</option>
          <option>Absent</option>
          <option>Half-day</option>
          <option>Leave</option>
        </select>
      </div>

      {/* Check-in / Check-out */}
      <div style={styles.buttons}>
        {!checkedIn ? (
          <button onClick={handleCheckIn} style={styles.btn}>
            Check In
          </button>
        ) : (
          <button onClick={handleCheckOut} style={styles.btnRed}>
            Check Out
          </button>
        )}
      </div>

      {/* Attendance View */}
      <div style={styles.tableCard}>
        <h3>Your Attendance</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{status}</td>
              <td>{checkedIn ? "09:30 AM" : "--"}</td>
              <td>{!checkedIn ? "06:30 PM" : "--"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  card: { margin: "15px 0" },
  select: { padding: "8px", marginLeft: "10px" },
  buttons: { marginTop: "15px" },
  btn: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  btnRed: {
    padding: "10px 20px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  tableCard: { marginTop: "30px" },
  table: { width: "100%", borderCollapse: "collapse" },
};

export default Attendance;
