import React from 'react';
import { Link } from 'react-router-dom';
import './VolunteerProfile.css'; // Import new CSS file

const VolunteerProfile = ({ profile, history }) => {
  return (
    <div className="vp-container">
      <div className="vp-card">
        {/* Header with profile picture */}
        <div className="vp-header">
          {profile.profilePictureUrl && (
            <img
              src={profile.profilePictureUrl}
              alt={profile.name}
              className="vp-avatar"
            />
          )}
          <div>
            <h1 className="vp-name">{profile.name}</h1>
            <p className="vp-status">
              <strong>Status:</strong>{' '}
              <span className={profile.isAvailable ? 'vp-available' : 'vp-unavailable'}>
                {profile.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <section className="vp-section">
          <h2>Contact Information</h2>
          <div className="vp-info">
            <p><strong>Name:</strong> {profile.userProfile.name}</p>
            <p><strong>Email:</strong> {profile.userProfile.email}</p>
            <p><strong>Phone:</strong> {profile.userProfile.phone || 'Not provided'}</p>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="vp-section">
          <h2>Performance Metrics</h2>
          <div className="vp-info">
            <p><strong>Average Response Time:</strong> {profile.averageResponseTime ? `${profile.averageResponseTime} minutes` : 'N/A'}</p>
            <p><strong>Average Resolve Time:</strong> {profile.averageResolveTime ? `${profile.averageResolveTime} hours` : 'N/A'}</p>
            <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </section>

        <hr className="vp-divider" />

        {/* Assigned Incident History */}
        <section className="vp-section">
          <h2>Assigned Incident History</h2>
          {history && history.length > 0 ? (
            <div className="vp-table-wrapper">
              <table className="vp-table">
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Resolved At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((incident) => (
                    <tr key={incident.id}>
                      <td>{incident.id.substring(0, 8)}...</td>
                      <td>{incident.title}</td>
                      <td>
                        <span
                          className={`vp-status-tag ${
                            incident.status === 'RESOLVED'
                              ? 'resolved'
                              : incident.status === 'IN_PROGRESS'
                              ? 'in-progress'
                              : 'pending'
                          }`}
                        >
                          {incident.status}
                        </span>
                      </td>
                      <td>{incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleDateString() : 'Pending'}</td>
                      <td>
                        <Link to={`/incidents/${incident.id}`} className="vp-link">
                          View Incident
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="vp-empty">No incidents have been assigned to this volunteer.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default VolunteerProfile;
