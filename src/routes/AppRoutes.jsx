import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useSelector } from 'react-redux';

// --- (Import all your page components) ---
import LoginPage from '../pages/LoginPage';
import OverviewPage from '../pages/OverviewPage';
import IncidentsListPage from '../pages/IncidentsListPage';
import IncidentDetailsPage from '../pages/IncidentDetailsPage';
import VolunteersPage from '../pages/VolunteersPage';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import UserManagementPage from '../pages/UserManagementPage';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import AuditLogsPage from '../pages/AuditLogsPage';

// PrivateRoute: If not authenticated, redirect to /login.
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* --- MODIFIED LOGIN ROUTE --- */}
      {/* If the user is authenticated, redirect from /login to the overview page. */}
      {/* Otherwise, show the LoginPage component. */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />

      {/* --- PROTECTED ROUTES --- */}
      <Route path="/" element={<PrivateRoute><OverviewPage /></PrivateRoute>} />
      <Route path="/incidents" element={<PrivateRoute><IncidentsListPage /></PrivateRoute>} />
      <Route path="/incidents/:id" element={<PrivateRoute><IncidentDetailsPage /></PrivateRoute>} />
      <Route path="/volunteers" element={<PrivateRoute><VolunteersPage /></PrivateRoute>} />
      <Route path="/volunteers/:id" element={<PrivateRoute><VolunteerProfilePage /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><UserManagementPage /></PrivateRoute>} />
      <Route path="/announcements" element={<PrivateRoute><AnnouncementsPage /></PrivateRoute>} />
      <Route path="/audit-logs" element={<PrivateRoute><AuditLogsPage /></PrivateRoute>} />

      {/* Optional: A catch-all route to redirect to the overview page if logged in, or login if not */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;