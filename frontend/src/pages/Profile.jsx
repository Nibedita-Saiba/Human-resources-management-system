import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        alert("Unable to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      <p>
        <b>Employee ID:</b> {user.employeeId}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Role:</b> {user.role}
      </p>
    </div>
  );
}
