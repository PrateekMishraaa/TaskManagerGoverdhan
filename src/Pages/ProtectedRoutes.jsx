import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, userRole, isAuthenticated }) => {
  const token = localStorage.getItem("refreshToken");

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow Admin to access everything
  if (userRole === "Admin") {
    return children;
  }

  // Check if user role is allowed
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // Redirect if not allowed
  switch (userRole) {
    case "Developer":
      return <Navigate to="/developer-dashboard" replace />;
    case "ProjectManager":
      return <Navigate to="/project-manager-dashboard" replace />;
    case "User":
      return <Navigate to="/" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
