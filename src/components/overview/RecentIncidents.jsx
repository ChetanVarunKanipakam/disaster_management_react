import React from 'react';
import { Link } from 'react-router-dom';
import './Stats.css';

const RecentIncidents = ({ incidents }) => {
  return (
    <div className="stat-card large-card">
      <h3>Recent Incidents</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Severity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {incidents && incidents.map(incident => (
            <tr key={incident.id}>
              <td>{incident.title}</td>
              <td>{incident.status}</td>
              <td>{incident.severity}</td>
              <td><Link to={`/incidents/${incident.id}`}>Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentIncidents;