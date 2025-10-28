import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function getCurrentUser() {
  const user = localStorage.getItem("tutornova_user");
  return user ? JSON.parse(user) : null;
}

const ProtectedRoute: React.FC = () => {
  const user = getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
