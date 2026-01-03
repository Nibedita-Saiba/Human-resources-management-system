import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* Not logged in */}
      {!token && (
        <>
          <Link to="/">Login</Link> | <Link to="/signup">Signup</Link>
        </>
      )}

      {/* Employee */}
      {token && role === "EMPLOYEE" && (
        <>
          <Link to="/employee">Dashboard</Link> | <Link to="/leave">Leave</Link>{" "}
          | <button onClick={logout}>Logout</button>
        </>
      )}

      {/* Admin */}
      {token && role === "ADMIN" && (
        <>
          <Link to="/admin">Dashboard</Link> |{" "}
          <Link to="/admin/leaves">Leave Approvals</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
