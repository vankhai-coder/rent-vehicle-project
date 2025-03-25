import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { role } = useSelector((state) => state.user);

  if (!allowedRoles.includes(role)) {
    toast.error(`Only ${allowedRoles} can access this!`)
    return <Navigate to="/" />;
  }

  return <Outlet />; // Render child routes inside
};

export default ProtectedRoute;
