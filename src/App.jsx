import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import DeveloperDashboard from './Pages/DeveloperPages/DeveloperDashboard';
import ProjectManagerDashboard from './Pages/ProjectManagerPages/ProjectManagerDashboard.jsx';
import ProtectedRoute from './Pages/ProtectedRoutes.jsx';
import AdminDashboard from './Pages/AminPages/AdminDashboard.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />} />

        {/* Default redirect based on role */}
        <Route path="/" element={
          isAuthenticated ? (
            userRole === "Developer"
              ? <Navigate to="/developer-dashboard" replace />
              : userRole === "ProjectManager"
                ? <Navigate to="/project-manager-dashboard" replace />
                : userRole === "Admin"
                  ? <Navigate to="/admin" replace />
                  : <Home /> // fallback if role not matched
          ) : <Navigate to="/login" replace />
        } />

        {/* Developer only */}
        <Route path="/developer-dashboard" element={
          <ProtectedRoute allowedRoles={["Developer"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <DeveloperDashboard />
          </ProtectedRoute>
        } />

        {/* Admin only */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["Admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Project Manager only */}
        <Route path="/project-manager-dashboard" element={
          <ProtectedRoute allowedRoles={["ProjectManager"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <ProjectManagerDashboard />
          </ProtectedRoute>
        } />

        {/* Example: Profile route for all roles */}
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["Developer", "ProjectManager", "Admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Catch all unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
