import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/employee");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          margin: 0;
        }

        .login-wrapper {
          position: fixed;
          inset: 0;
          background-image: url("https://blog.mantratec.com/Images/post-img/lg/2018/Biometrics-in-Human-Resource-Management-System.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
        }

        .login-card {
          position: relative;
          width: 400px;
          background: #ffffff;
          border-radius: 14px;
          padding: 38px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
          z-index: 2;
        }

        .logo {
          text-align: center;
          font-size: 30px;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 6px;
        }

        .tagline {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 28px;
        }

        .login-card input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 16px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .login-card input:focus {
          border-color: #4f46e5;
          outline: none;
        }

        .login-card button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #4f46e5;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-card button:hover {
          background: #4338ca;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          margin-top: 18px;
        }

        .footer span {
          color: #4f46e5;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="overlay"></div>

        <div className="login-card">
          <div className="logo">Dayflow</div>
          <div className="tagline">
            Human Resource Management System
          </div>

          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Sign In</button>

          <div className="footer">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Signup</span>
          </div>
        </div>
      </div>
    </>
  );
}
