import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import EmployeeManagement from "./pages/EmployeeManagement";
import AddEmployee from "./pages/AddEmployees";
import ViewEmployee from "./pages/ViewEmployee";
import EditEmployee from "./pages/EditEmployee";
import AttendanceManagement from "./pages/AttendenceManagement";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/viewemployee/:id" element={<ViewEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
      </Route>
    </Routes>
  );
};

export default App;
