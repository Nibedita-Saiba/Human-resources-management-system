import React from "react";

const Signup = () => {
  return (
    <div style={authContainer}>
      <h2>Sign Up</h2>
      <input style={input} type="text" placeholder="Name" />
      <input style={input} type="email" placeholder="Email" />
      <input style={input} type="password" placeholder="Password" />
      <button style={button}>Create Account</button>
    </div>
  );
};

const authContainer = {
  maxWidth: "350px",
  margin: "100px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  padding: "10px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Signup;
