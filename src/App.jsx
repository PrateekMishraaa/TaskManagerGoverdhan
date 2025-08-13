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
  const isAuthenticated = !!user;
console.log(user);
  
  const userRole = user?.role?.replace(/\s+/g, '').toLowerCase();

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />} />

        {/* Home Redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === "developer"
                ? <Navigate to="/developer-dashboard" replace />
                : userRole === "projectmanager"
                  ? <Navigate to="/project-manager-dashboard" replace />
                  : userRole === "admin"
                    ? <Navigate to="/admin" replace />
                    : <Home />
            ) : <Navigate to="/login" replace />
          }
        />

        {/* Developer Dashboard */}
        <Route
          path="/developer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["developer"]} userRole={userRole} isAuthenticated={isAuthenticated}>
              <DeveloperDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Project Manager Dashboard */}
        <Route
          path="/project-manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["projectmanager"]} userRole={userRole} isAuthenticated={isAuthenticated}>
              <ProjectManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["developer", "projectmanager", "admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
