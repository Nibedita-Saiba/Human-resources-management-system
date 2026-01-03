import api from "../api/axios";

export default function AdminDashboard() {
  const loadDashboard = async () => {
    const res = await api.get("/dashboard/admin");
    alert(`Employees: ${res.data.employees}`);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={loadDashboard}>Load Dashboard</button>
    </div>
  );
}
