import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{
      width: "200px",
      backgroundColor: "#263238",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <p><Link to="/">Dashboard</Link></p>
      <p><Link to="/employees">Employees</Link></p>
      <p><Link to="/attendance">Attendance</Link></p>
      <p><Link to="/payroll">Payroll</Link></p>
    </div>
  );
};

export default Sidebar;
