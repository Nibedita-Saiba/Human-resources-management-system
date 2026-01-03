import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
