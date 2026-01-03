import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const navigate = useNavigate();

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  // ✅ Validation helpers
  const isValidGmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isStrongPassword = () =>
    Object.values(passwordRules).every(Boolean);

  const signup = async () => {
    if (!employeeId || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!isValidGmail(email)) {
      alert("Email must end with @gmail.com");
      return;
    }

    if (!isStrongPassword()) {
      alert("Password does not meet all security rules");
      return;
    }

    try {
      await api.post("/auth/signup", {
        employeeId,
        email,
        password,
        role,
      });
      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Signup failed");
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

        .signup-wrapper {
          position: fixed;
          inset: 0;
          background-image: url("https://blog.mantratec.com/Images/post-img/lg/2018/Biometrics-in-Human-Resource-Management-System.jpg");
          background-size: cover;
          background-position: center;
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

        .signup-card {
          position: relative;
          width: 420px;
          background: white;
          border-radius: 14px;
          padding: 36px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          z-index: 2;
        }

        .logo {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 6px;
        }

        .tagline {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 22px;
        }

        .signup-card input,
        .signup-card select {
          width: 100%;
          height: 44px;
          padding: 10px 14px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1.5px solid #d1d5db;
          font-size: 14px;
          background: white;
          color: #111827;
        }

        .signup-card input::placeholder {
          color: #9ca3af;
        }

        .signup-card input:focus,
        .signup-card select:focus {
          border-color: #4f46e5;
          outline: none;
        }

        .signup-card select {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='%234f46e5' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          cursor: pointer;
        }

        .rules {
          font-size: 12px;
          margin-bottom: 12px;
        }

        .rule {
          margin-bottom: 4px;
        }

        .rule.valid {
          color: green;
        }

        .rule.invalid {
          color: red;
        }

        .signup-card button {
          width: 100%;
          height: 44px;
          border-radius: 8px;
          border: none;
          background: #4f46e5;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 6px;
        }

        .signup-card button:hover {
          background: #4338ca;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          margin-top: 16px;
        }

        .footer span {
          color: #4f46e5;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="signup-wrapper">
        <div className="overlay"></div>

        <div className="signup-card">
          <div className="logo">Dayflow</div>
          <div className="tagline">Create your Human Resource account</div>

          <input
            placeholder="Employee ID"
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordRules({
                length: value.length >= 8,
                upper: /[A-Z]/.test(value),
                lower: /[a-z]/.test(value),
                number: /\d/.test(value),
                special: /[@$!%*?&]/.test(value),
              });
            }}
          />

          {/* PASSWORD RULES */}
          <div className="rules">
            <div className={`rule ${passwordRules.length ? "valid" : "invalid"}`}>
              {passwordRules.length ? "✔" : "✖"} At least 8 characters
            </div>
            <div className={`rule ${passwordRules.upper ? "valid" : "invalid"}`}>
              {passwordRules.upper ? "✔" : "✖"} One uppercase letter
            </div>
            <div className={`rule ${passwordRules.lower ? "valid" : "invalid"}`}>
              {passwordRules.lower ? "✔" : "✖"} One lowercase letter
            </div>
            <div className={`rule ${passwordRules.number ? "valid" : "invalid"}`}>
              {passwordRules.number ? "✔" : "✖"} One number
            </div>
            <div className={`rule ${passwordRules.special ? "valid" : "invalid"}`}>
              {passwordRules.special ? "✔" : "✖"} One special character
            </div>
          </div>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button onClick={signup}>Create Account</button>

          <div className="footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </div>
        </div>
      </div>
    </>
  );
}
