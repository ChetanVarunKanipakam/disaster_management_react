import React from 'react';
import { Link } from 'react-router-dom';

const VolunteerProfile = ({ profile, history }) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {profile.profilePictureUrl && (
          <img
            src={profile.profilePictureUrl}
            alt={profile.name}
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
          />
        )}
        <div>
          <h1>{profile.name}</h1>
          <p><strong>Status:</strong> <span style={{ color: profile.isAvailable ? 'green' : 'red' }}>{profile.isAvailable ? 'Available' : 'Unavailable'}</span></p>
        </div>
      </div>

      <h2>Contact Information</h2>
      <p><strong>Name:</strong> {profile.userProfile.name}</p>
      <p><strong>Email:</strong> {profile.userProfile.email}</p>
      <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>

      <h2>Performance Metrics</h2>
      <p><strong>Average Response Time:</strong> {profile.averageResponseTime ? `${profile.averageResponseTime} minutes` : 'N/A'}</p>
      <p><strong>Average Resolve Time:</strong> {profile.averageResolveTime ? `${profile.averageResolveTime} hours` : 'N/A'}</p>
      <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>

      <hr style={{ margin: '20px 0' }}/>

      <h2>Assigned Incident History</h2>
      {history && history.length > 0 ? (
        <table>
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
                <td>{incident.status}</td>
                <td>{incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleDateString() : 'Pending'}</td>
                <td>
                  <Link to={`/incidents/${incident.id}`}>View Incident</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No incidents have been assigned to this volunteer.</p>
      )}
    </div>
  );
};

export default VolunteerProfile;