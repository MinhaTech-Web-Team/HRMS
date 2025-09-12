import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import EmployeeManagement from "./pages/EmployeeModule/EmployeeManagement";
import AddEmployee from "./pages/EmployeeModule/AddEmployees";
import ViewEmployee from "./pages/EmployeeModule/ViewEmployee";
import EditEmployee from "./pages/EmployeeModule/EditEmployee";
import AttendanceManagement from "./pages/AttendenceModule/AttendenceManagement";
import AllEmployees from "./pages/AttendenceModule/AllEmployees";
import ViewAttendence from "./pages/AttendenceModule/ViewAttendence";
import EditAttendence from "./pages/AttendenceModule/EditAttendence";
import ExportAttendence from "./pages/AttendenceModule/ExportAttendence";

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
        <Route path="/allemployees" element={<AllEmployees />} />
        <Route path="/view-attendance/:id" element={<ViewAttendence />} />
        <Route path="/edit-attendance/:id" element={<EditAttendence />} />
        <Route path="/export-attendance/:id" element={<ExportAttendence />} />
      </Route>
    </Routes>
  );
};

export default App;
