import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Layout.css'; // Import the new CSS file

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    // This outer div is always present, even for login page, so 'root' styling should apply here.
    // However, the flex layout only applies *when authenticated*.
    // So, we add a specific class for the authenticated layout structure.
    <div className="app-container"> {/* Renamed for clarity */}
      {isAuthenticated ? ( // Only render the sidebar and main content if authenticated
        <div className="authenticated-layout"> {/* New wrapper for flex content */}
           <nav>
          <ul>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Overview</Link></li>
            <li><Link to="/incidents" className={location.pathname.startsWith('/incidents') ? 'active' : ''}>Incidents</Link></li>
            <li><Link to="/volunteers" className={location.pathname.startsWith('/volunteers') ? 'active' : ''}>Volunteers</Link></li>
            <li><Link to="/users" className={location.pathname.startsWith('/users') ? 'active' : ''}>Users</Link></li>
            <li class='announcements'><Link to="/announcements" className={location.pathname.startsWith('/announcements') ? 'active' : ''}>Announcements</Link></li>
            <li><Link to="/audit-logs" className={location.pathname.startsWith('/audit-logs') ? 'active' : ''}>Audit Logs</Link></li>
          </ul>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </nav>
          <main>{children}</main>
        </div>
      ) : (
        // If not authenticated, just render the children (e.g., LoginPage) without the nav
        <main>{children}</main>
      )}
    </div>
  );
};

export default Layout;