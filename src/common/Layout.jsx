import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <div className="authenticated-layout">
          <nav>
            <div className="nav-header">
              <h2>Disaster Management</h2>
            </div>
            
            <ul>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/incidents" className={location.pathname.startsWith('/incidents') ? 'active' : ''}>
                  Incidents
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className={location.pathname.startsWith('/volunteers') ? 'active' : ''}>
                  Volunteers
                </Link>
              </li>
              <li>
                <Link to="/users" className={location.pathname.startsWith('/users') ? 'active' : ''}>
                  Users
                </Link>
              </li>
              <li className="announcements">
                <Link to="/announcements" className={location.pathname.startsWith('/announcements') ? 'active' : ''}>
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/audit-logs" className={location.pathname.startsWith('/audit-logs') ? 'active' : ''}>
                  Audit Logs
                </Link>
              </li>
            </ul>
            
            <div className="nav-footer">
              <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
          </nav>
          
          <main>{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
};

export default Layout;