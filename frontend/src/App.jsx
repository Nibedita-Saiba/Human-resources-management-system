import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LeavePage from "./pages/LeavePage";
import AdminLeavePage from "./pages/AdminLeavePage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      {/* Top Navigation */}
      <Navbar />

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* App Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile (Admin & Employee) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <LeavePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leaves"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLeavePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}