import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UsersList from "../Pages/Admin/UsersList";
import ServiceProvidersList from "../Pages/Admin/ServiceProvidersList";
import AdminProfile from "../Pages/Admin/AdminProfile";
import Transactions from "../Pages/Admin/Transactions";
import ServiceVerification from "../Pages/Admin/ServiceVerification";
import ServiceManagement from "../Pages/Admin/ServiceManagement";

function AdminRouters() {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/login" />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/customers" element={<UsersList />} />
      <Route path="/admin/serviceProvider" element={<ServiceProvidersList />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/transactions" element={<Transactions />} />
      <Route path="/admin/verifyService" element={<ServiceVerification />} />
      <Route path="/admin/serviceManagement" element={<ServiceManagement />} />
    </Routes>
  );
}

export default AdminRouters;
