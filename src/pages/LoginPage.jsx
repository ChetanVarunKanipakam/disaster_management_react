import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = () => {
    if (!email || !password) return;
    dispatch(login({ email, password }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  return (
    <div className="login-page">
      {/* Animated background pattern */}
      <div className="background-pattern">
        <div className="background-pattern-inner"></div>
      </div>

      {/* Emergency alert banner */}
      <div className="emergency-banner">
        <div className="emergency-banner-content">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Emergency Response Portal - Authorized Personnel Only</span>
        </div>
      </div>

      {/* Main login container */}
      <div className="login-main-container">
        {/* Logo and header section */}
        <div className="login-header">
          <div className="logo-container">
            <svg 
              className="logo-icon"
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h1 className="main-title">Disaster Management</h1>
          <p className="main-subtitle">Emergency Response System</p>
        </div>

        {/* Login card */}
        <div className="login-card">
          {/* Card header */}
          <div className="card-header">
            <h2 className="card-title">Admin Login</h2>
            <p className="card-subtitle">Secure access to command center</p>
          </div>

          {/* Form section */}
          <div className="form-section">
            {status === 'failed' && (
              <div className="error-container">
                <div className="error-content">
                  <svg 
                    className="error-icon"
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <div>
                    <p className="error-title">Authentication Failed</p>
                    <p className="error-message">
                      {error || 'Login failed. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email input */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <svg 
                  className="input-icon"
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <polyline points="3 7 12 13 21 7"></polyline>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="admin@emergency.gov"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <svg 
                  className="input-icon"
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your secure password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="checkbox-text">Remember me</span>
              </label>
              <button className="forgot-password">
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={status === 'loading' || !email || !password}
              className="submit-button"
            >
              {status === 'loading' ? (
                <span className="button-content">
                  <svg 
                    className="spinner" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="spinner-circle"
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="spinner-path"
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Access Command Center'
              )}
            </button>

            {/* Security notice */}
            <div className="security-notice">
              <div className="security-content">
                <svg 
                  className="security-icon"
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p>
                  This system is protected by advanced encryption. All access 
                  attempts are monitored and logged for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-contact">
            Need assistance? Contact{' '}
            <span className="footer-email">emergency-support@gov.in</span>
          </p>
          <p className="footer-copyright">
            © 2025 National Disaster Management Authority
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="decorative-blob-left"></div>
      <div className="decorative-blob-right"></div>
    </div>
  );
};

export default LoginPage;