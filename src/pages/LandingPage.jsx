import React, { useState, useEffect } from 'react';
import { AlertCircle, MapPin, Users, Zap, Shield, BarChart3, Menu, X, Download, Smartphone } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : 'transparent'}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <Shield size={32} color="#dc2626" />
              <span className="nav-logo-text">DisasterManagment</span>
            </div>
            
            <div className="nav-links">
              <a href="#features" className="nav-link desktop-only">Features</a>
              <a href="#benefits" className="nav-link desktop-only">Benefits</a>
              <a href="#download" className="nav-link desktop-only">Download</a>
              <a href="/admin/login" className="nav-button">
                Admin Login
              </a>
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a 
                href="#features" 
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#benefits" 
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="#download" 
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download
              </a>
              <a 
                href="/admin/login" 
                className="mobile-menu-button"
              >
                Admin Login
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                Emergency Response Platform
              </div>
              <h1 className="hero-title">
                Connecting Communities During Disasters
              </h1>
              <p className="hero-description">
                A unified platform that bridges citizens, volunteers, and authorities to respond faster and save lives during emergencies.
              </p>
              <div className="hero-buttons">
                <a href="#download" className="hero-button-primary">
                  <Download size={20} />
                  <span>Download App</span>
                </a>
                <a href="/admin/login" className="hero-button-secondary">
                  Authority Dashboard
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-circle">
                <Shield size={128} color="white" style={{opacity: 0.9}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Purpose</h2>
            <p className="section-subtitle">
              During natural disasters, every second counts. DisasterHub eliminates communication delays and coordination chaos by connecting everyone who matters.
            </p>
          </div>

          <div className="grid-3">
            <div className="purpose-card blue">
              <div className="purpose-icon blue">
                <Smartphone size={24} color="white" />
              </div>
              <h3 className="card-title">Citizens Report</h3>
              <p className="card-description">
                Instantly report fires, medical emergencies, roadblocks, or collapsed buildings with exact location and severity from your mobile device.
              </p>
            </div>

            <div className="purpose-card green">
              <div className="purpose-icon green">
                <Users size={24} color="white" />
              </div>
              <h3 className="card-title">Volunteers Respond</h3>
              <p className="card-description">
                Receive real-time alerts of nearby incidents, acknowledge assignments, and update status as situations progress on the ground.
              </p>
            </div>

            <div className="purpose-card red">
              <div className="purpose-icon red">
                <BarChart3 size={24} color="white" />
              </div>
              <h3 className="card-title">Authorities Coordinate</h3>
              <p className="card-description">
                Monitor all incidents on an interactive map, prioritize critical cases, assign teams, and make data-driven decisions in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section section-light">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need for effective disaster response</p>
          </div>

          <div className="grid-3">
            {[
              { icon: MapPin, title: 'Real-Time Mapping', desc: 'Interactive maps showing all incidents with severity filters and geospatial intelligence' },
              { icon: Zap, title: 'Instant Alerts', desc: 'WebSocket-powered notifications ensure zero-delay communication during emergencies' },
              { icon: Users, title: 'Smart Assignment', desc: 'Automatically match incidents with nearest available volunteers and teams' },
              { icon: Shield, title: 'Priority Management', desc: 'AI-driven severity assessment ensures critical cases get immediate attention' },
              { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Generate reports and insights for better disaster preparedness and response' },
              { icon: AlertCircle, title: 'Status Tracking', desc: 'Monitor incident progress from report to resolution with transparent updates' }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div key={idx} className="feature-card">
                  <IconComponent size={40} color="#dc2626" className="feature-icon" />
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="card-description">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why DisasterHub?</h2>
            <p className="section-subtitle">Proven advantages that save lives</p>
          </div>

          <div className="grid-2">
            {[
              { title: 'Faster Response Time', desc: 'Real-time alerts and instant communication reduce response delays by up to 60%' },
              { title: 'Mobile-First Engagement', desc: 'Citizens can report emergencies from anywhere using their smartphones' },
              { title: 'Efficient Resource Allocation', desc: 'Prioritization algorithms ensure critical cases receive immediate attention' },
              { title: 'Complete Transparency', desc: 'Citizens can track the status of their reports from submission to resolution' },
              { title: 'Centralized Monitoring', desc: 'Authorities get a unified view of all incidents for better decision-making' },
              { title: 'Geo-Intelligence', desc: 'PostGIS technology enables hotspot analysis and nearest resource tracking' }
            ].map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">
                  <div className="benefit-dot"></div>
                </div>
                <div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="card-description">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section">
        <div className="download-container">
          <h2 className="download-title">Get Started Today</h2>
          <p className="download-subtitle">
            Download the DisasterHub app and be part of your community's emergency response network
          </p>

          <div className="download-buttons">
            <a 
              href="/Downloads/DisasterManagement.apk" 
              download
              className="download-button"
            >
              <Download size={32} />
              <div className="download-info">
                <div className="download-title-text">Download APK</div>
                <div className="download-subtitle-text">For Android devices (v5.0+)</div>
              </div>
            </a>
            <p className="download-note">
              Direct APK installation. Make sure to enable "Install from Unknown Sources" in your device settings.
            </p>
          </div>

          <div className="admin-access">
            <p className="admin-access-text">Are you an authority or admin?</p>
            <a href="/admin/login" className="admin-access-button">
              Access Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <Shield size={24} color="#dc2626" />
                <span className="footer-brand-text">DisasterHub</span>
              </div>
              <p className="footer-description">
                Connecting communities for faster disaster response and recovery.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Product</h4>
              <div className="footer-links">
                <a href="#features" className="footer-link">Features</a>
                <a href="#benefits" className="footer-link">Benefits</a>
                <a href="#download" className="footer-link">Download</a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Resources</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Documentation</a>
                <a href="#" className="footer-link">Support</a>
                <a href="#" className="footer-link">Training</a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Contact</h4>
              <div className="footer-links">
                <div>Emergency: 911</div>
                <div>Support: support@disasterhub.com</div>
                <div>Admin: admin@disasterhub.com</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 DisasterHub. Built to save lives and strengthen communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}