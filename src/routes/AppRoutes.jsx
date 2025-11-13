import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Layout
import Layout from '../common/Layout';

// Import all your page components
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import OverviewPage from '../pages/OverviewPage';
import IncidentsListPage from '../pages/IncidentsListPage';
import IncidentDetailsPage from '../pages/IncidentDetailsPage';
import VolunteersPage from '../pages/VolunteersPage';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import UserManagementPage from '../pages/UserManagementPage';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import AuditLogsPage from '../pages/AuditLogsPage';

// PrivateRoute: If not authenticated, redirect to /admin/login
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Wrap authenticated routes with Layout
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* PUBLIC ROUTES - No Layout */}
      {/* Landing Page - Main entry point */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Admin Login - No Layout */}
      <Route
        path="/admin/login"
        element={isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage />}
      />

      {/* PROTECTED ADMIN ROUTES - Wrapped with Layout via PrivateRoute */}
      <Route path="/admin" element={<PrivateRoute><OverviewPage /></PrivateRoute>} />
      <Route path="/admin/incidents" element={<PrivateRoute><IncidentsListPage /></PrivateRoute>} />
      <Route path="/admin/incidents/:id" element={<PrivateRoute><IncidentDetailsPage /></PrivateRoute>} />
      <Route path="/admin/volunteers" element={<PrivateRoute><VolunteersPage /></PrivateRoute>} />
      <Route path="/admin/volunteers/:id" element={<PrivateRoute><VolunteerProfilePage /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute><UserManagementPage /></PrivateRoute>} />
      <Route path="/admin/announcements" element={<PrivateRoute><AnnouncementsPage /></PrivateRoute>} />
      <Route path="/admin/audit-logs" element={<PrivateRoute><AuditLogsPage /></PrivateRoute>} />

      {/* Catch-all route - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;