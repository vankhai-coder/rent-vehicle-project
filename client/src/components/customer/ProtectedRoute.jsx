import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { role, userId } = useSelector((state) => state.user);

  if (!userId) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    toast.error(`Only ${allowedRoles.join(", ")} can access this page`);
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
