import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const {  role } = useSelector((state) => state.user);

  if (!allowedRoles.includes(role)) {
      return <Navigate to="/"/>;
  }

  return <Outlet />; // Render child routes inside
};

export default ProtectedRoute;
