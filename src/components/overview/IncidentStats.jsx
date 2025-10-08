import React from 'react';
import './Stats.css'; // We'll create this new CSS file

const IncidentStats = ({ stats }) => {
  if (!stats || !stats.byStatus) {
    return <div className="stat-card">Loading stats...</div>;
  }

  return (
    <div className="stat-card">
      <h3>Incident Breakdown</h3>
      <div className="stat-group">
        <strong>By Status:</strong>
        <ul>
          {Object.entries(stats.byStatus).map(([status, count]) => (
            <li key={status}><span>{status}:</span> <strong>{count}</strong></li>
          ))}
        </ul>
      </div>
      <div className="stat-group">
        <strong>By Severity:</strong>
        <ul>
          {Object.entries(stats.bySeverity).map(([severity, count]) => (
            <li key={severity}><span>{severity}:</span> <strong>{count}</strong></li>
          ))}
        </ul>
      </div>
      <div className="stat-total">
        Total Incidents: <span>{stats.total}</span>
      </div>
    </div>
  );
};

export default IncidentStats;


