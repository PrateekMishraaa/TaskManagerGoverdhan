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
  console.log(user);
  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Router>
      <Routes>
      
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />} />

        <Route path="/" element={
          isAuthenticated ? (
            userRole === "Developer"
              ? <Navigate to="/developer-dashboard" replace />
              : userRole === "ProjectManager"
                ? <Navigate to="/project-manager-dashboard" replace />
                : userRole === "Admin"
                  ? <Navigate to="/admin" replace />
                  : <Home /> 
          ) : <Navigate to="/login" replace />
        } />

        <Route path="/developer-dashboard" element={
          <ProtectedRoute allowedRoles={["Developer"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <DeveloperDashboard />
          </ProtectedRoute>
        } />

        
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["Admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

       
        <Route path="/project-manager-dashboard" element={
          <ProtectedRoute allowedRoles={["ProjectManager"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <ProjectManagerDashboard />
          </ProtectedRoute>
        } />

      
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["Developer", "ProjectManager", "Admin"]} userRole={userRole} isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        } />

       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
