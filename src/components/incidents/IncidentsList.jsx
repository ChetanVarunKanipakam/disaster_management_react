import React from 'react';
import { Link } from 'react-router-dom';
import './IncidentsList.css';

const IncidentsList = ({ incidents }) => {
  console.log(incidents);
  
  if (!incidents.rows || incidents.rows.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <div className="empty-state-text">No incidents found</div>
        <div className="empty-state-subtext">
          Try adjusting your filters or check back later
        </div>
      </div>
    );
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace('_', '-');
  };

  const getSeverityClass = (severity) => {
    return severity.toLowerCase();
  };

  return (
    <div className="incidents-list-container">
      <table className="incidents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.rows.map((incident) => (
            <tr key={incident.id}>
              <td>
                <span className="incident-id" title={incident.id}>
                  {incident.id.substring(0, 8)}...
                </span>
              </td>
              <td>
                <span className="incident-title">{incident.title}</span>
              </td>
              <td>
                <span className={`status-badge ${getStatusClass(incident.status)}`}>
                  {incident.status.replace('_', ' ')}
                </span>
              </td>
              <td>
                <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </span>
              </td>
              <td>
                <Link to={`/admin/incidents/${incident.id}`} className="action-link">
                  View Details →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentsList;