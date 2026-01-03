import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        alert("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          margin: 0;
          background: #f4f6f8;
        }

        /* ABSOLUTE CENTER FIX */
        .profile-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px;
        }

        .profile-card {
          width: 420px;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .profile-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #4f46e5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          margin: 0 auto 12px;
        }

        .profile-title {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
        }

        .profile-subtitle {
          font-size: 13px;
          color: #6b7280;
        }

        .profile-info {
          margin-top: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 13px;
          color: #6b7280;
        }

        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .role-badge {
          background: #eef2ff;
          color: #4f46e5;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

      <div className="profile-center">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-title">My Profile</div>
            <div className="profile-subtitle">
              Human Resource Management System
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <div className="info-label">Employee ID</div>
              <div className="info-value">{user.employeeId}</div>
            </div>

            <div className="info-row">
              <div className="info-label">Email</div>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-row">
              <div className="info-label">Role</div>
              <div className="info-value">
                <span className="role-badge">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
