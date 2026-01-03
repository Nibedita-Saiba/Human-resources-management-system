import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={nav}>
      <h3>Human Management System</h3>

      <div style={right}>
        <Link to="/login">
          <button style={loginBtn}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={signupBtn}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 25px",
  background: "#1976d2",
  color: "#fff",
};

const right = {
  display: "flex",
  gap: "10px",
};

const loginBtn = {
  background: "#fff",
  color: "#1976d2",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const signupBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;
