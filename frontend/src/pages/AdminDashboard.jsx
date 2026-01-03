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
        alert("9 user found");
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #f5f6fa;
          font-family: Inter, sans-serif;
        }

        /* PAGE CENTER */
        .admin-page {
          min-height: calc(100vh - 70px);
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .admin-container {
          width: 100%;
          max-width: 1000px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #111827;
          text-align: center;
        }

        /* CARD */
        .card {
          background: white;
          padding: 28px;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #111827;
        }

        /* TABLE */
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        thead {
          background: #f3f4f6;
        }

        th {
          text-align: left;
          padding: 14px;
          color: #374151;
          font-weight: 600;
          border-bottom: 1px solid #e5e7eb;
        }

        td {
          padding: 14px;
          border-bottom: 1px solid #e5e7eb;
          color: #111827;
        }

        tr:hover td {
          background: #f9fafb;
        }

        /* ROLE BADGE */
        .role {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .ADMIN {
          background: #fee2e2;
          color: #991b1b;
        }

        .EMPLOYEE {
          background: #e0e7ff;
          color: #3730a3;
        }

        .empty {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          padding: 20px;
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-container">
          <div className="page-title">Admin Dashboard</div>

          <div className="card">
            <div className="card-title">Employees List</div>

            {users.length === 0 ? (
              <div className="empty"></div>
            ) : (
              <table>
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
                      <td>
                        <span className={`role ${u.role}`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
