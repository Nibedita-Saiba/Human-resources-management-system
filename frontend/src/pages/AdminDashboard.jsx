import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");
        setUsers(res.data);
      } catch {
        alert("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Employees List</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.employeeId}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
