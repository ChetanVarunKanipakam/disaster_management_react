import React from 'react';
import './Stats.css';

const VolunteerStats = ({ stats }) => {
  if (!stats) {
    return <div className="stat-card">Loading stats...</div>;
  }

  return (
    <div className="stat-card">
      <h3>Volunteer Status</h3>
      <div className="stat-group">
        <ul>
            <li><span>Active:</span> <strong style={{color: 'green'}}>{stats.active}</strong></li>
            <li><span>Idle:</span> <strong style={{color: 'orange'}}>{stats.idle}</strong></li>
        </ul>
      </div>
      <div className="stat-total">
        Total Volunteers: <span>{stats.total}</span>
      </div>
    </div>
  );
};

export default VolunteerStats;