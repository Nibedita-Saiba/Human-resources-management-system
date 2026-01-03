import React from "react";

const Employees = () => {
  const employees = []; // no data now

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employees</h2>
      <p style={{ color: "#666" }}>Manage employee records</p>

      {employees.length === 0 ? (
        <div style={emptyBox}>
          <div style={icon}>👥</div>
          <h3>No Employees Found</h3>
          <p style={{ color: "#777" }}>
            You haven’t added any employees yet.
          </p>
          <button style={button}>+ Add Employee</button>
        </div>
      ) : (
        <p>Employee cards here</p>
      )}
    </div>
  );
};

const emptyBox = {
  marginTop: "60px",
  padding: "40px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const icon = {
  fontSize: "48px",
  marginBottom: "10px",
};

const button = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Employees;
