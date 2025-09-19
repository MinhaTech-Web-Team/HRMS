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
import LeaveManagement from "./pages/LeaveModule/LeaveManagement";
import LeaveApplication from "./pages/LeaveModule/LeaveApplication";
import AllEmployeesLeaves from "./pages/LeaveModule/AllEmployeesLeaves";
import ViewLeaves from "./pages/LeaveModule/ViewLeaves";
import PayRollManagement from "./pages/PayrollModule/PayRollManagement";
import AllEmployeesPayroll from "./pages/PayrollModule/AllEmployeesPayroll";
import ViewPayroll from "./pages/PayrollModule/ViewPayroll";

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
        <Route path="/leaves" element={<LeaveManagement />} />
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/leaves-allemployees" element={<AllEmployeesLeaves />} />
        <Route path="/view-leaves/:id" element={<ViewLeaves />} />
        <Route path="/payroll" element={<PayRollManagement />} />
        <Route path="/payroll-allemployees" element={<AllEmployeesPayroll />} />
        <Route path="/view-payroll/:id" element={<ViewPayroll />} />
      </Route>
    </Routes>
  );
};

export default App;
