import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("refreshToken");
  // const token2 = localStorage.getItem("accessToken")
    // console.log(token)
    // console.log(token2)
  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
