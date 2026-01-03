import React, { useState } from "react";
import "./Login.css";
import { FaFacebookF, FaGoogle, FaGithub, FaApple, FaInstagram } from "react-icons/fa";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee ID:", employeeId);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon">
          <span>👥🔒</span>
        </div>

        <h2>Login Here</h2>

        <form onSubmit={handleSubmit}>
          <label>Employee Id</label>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login ➜</button>
        </form>

        <p className="forgot">
          Don't have an account ? <span>Forgot Password</span>
        </p>

        <div className="social-icons">
          <FaFacebookF />
          <FaGoogle />
          <FaGithub />
          <FaApple />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default Login;
