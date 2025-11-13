import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Layout.css';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="admin-layout">
      <nav>
        <div className="nav-header">
          <h2>Disaster Management</h2>
        </div>
        
        <ul>
          <li>
            <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
              Overview
            </Link>
          </li>
          <li>
            <Link to="/admin/incidents" className={location.pathname.startsWith('/admin/incidents') ? 'active' : ''}>
              Incidents
            </Link>
          </li>
          <li>
            <Link to="/admin/volunteers" className={location.pathname.startsWith('/admin/volunteers') ? 'active' : ''}>
              Volunteers
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={location.pathname.startsWith('/admin/users') ? 'active' : ''}>
              Users
            </Link>
          </li>
          <li className="announcements">
            <Link to="/admin/announcements" className={location.pathname.startsWith('/admin/announcements') ? 'active' : ''}>
              Announcements
            </Link>
          </li>
          <li>
            <Link to="/admin/audit-logs" className={location.pathname.startsWith('/admin/audit-logs') ? 'active' : ''}>
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
  );
};

export default Layout;