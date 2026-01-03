import React, { useState } from "react";

const Leave = () => {
  const [leaveType, setLeaveType] = useState("Paid");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Leave Applied Successfully");
  };

  return (
    <div style={styles.container}>
      <h2>Leave & Time-Off Management</h2>

      {/* Apply Leave */}
      <form onSubmit={handleSubmit} style={styles.card}>
        <h3>Apply for Leave</h3>

        <label>Leave Type</label>
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          style={styles.input}
        >
          <option>Paid</option>
          <option>Sick</option>
          <option>Unpaid</option>
        </select>

        <label>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={styles.input}
        />

        <label>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={styles.input}
        />

        <label>Remarks</label>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.btn}>
          Submit Leave
        </button>
      </form>

      {/* Leave Status */}
      <div style={styles.tableCard}>
        <h3>Your Leave Requests</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{leaveType}</td>
              <td>{fromDate || "--"}</td>
              <td>{toDate || "--"}</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  card: {
    maxWidth: "400px",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
  },
  btn: {
    padding: "10px",
    background: "#2196F3",
    color: "#fff",
    border: "none",
    width: "100%",
    cursor: "pointer",
  },
  tableCard: { marginTop: "30px" },
  table: { width: "100%", borderCollapse: "collapse" },
};

export default Leave;
