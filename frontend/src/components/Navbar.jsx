import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        /* FIX NAVBAR AT TOP */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          z-index: 1000;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 700;
          color: #4f46e5;
          cursor: pointer;
        }

        .nav-center {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-link {
          text-decoration: none;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 6px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-link:hover {
          background: #eef2ff;
          color: #4f46e5;
        }

        .nav-link.active {
          background: #eef2ff;
          color: #4f46e5;
          font-weight: 600;
        }

        .nav-right button {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          background: #111827;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .nav-right button:hover {
          background: #000000;
        }

        /* PUSH PAGE CONTENT BELOW NAVBAR */
        .page-offset {
          height: 60px;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        {/* LEFT */}
        <div className="nav-left" onClick={() => navigate("/")}>
          Dayflow
        </div>

        {/* CENTER */}
        <div className="nav-center">
          {!token && (
            <>
              <Link to="/" className={`nav-link ${isActive("/")}`}>
                Login
              </Link>
              <Link to="/signup" className={`nav-link ${isActive("/signup")}`}>
                Signup
              </Link>
            </>
          )}

          {token && (
            <Link
              to="/profile"
              className={`nav-link ${isActive("/profile")}`}
            >
              Profile
            </Link>
          )}

          {token && role === "EMPLOYEE" && (
            <>
              <Link
                to="/employee"
                className={`nav-link ${isActive("/employee")}`}
              >
                Dashboard
              </Link>
              <Link
                to="/leave"
                className={`nav-link ${isActive("/leave")}`}
              >
                Leave
              </Link>
            </>
          )}

          {token && role === "ADMIN" && (
            <>
              <Link
                to="/admin"
                className={`nav-link ${isActive("/admin")}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/leaves"
                className={`nav-link ${isActive("/admin/leaves")}`}
              >
                Leave Approvals
              </Link>
            </>
          )}
        </div>

        {/* RIGHT */}
        {token && (
          <div className="nav-right">
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </nav>

      {/* OFFSET SO CONTENT DOESN’T HIDE BEHIND NAVBAR */}
      <div className="page-offset"></div>
    </>
  );
}
