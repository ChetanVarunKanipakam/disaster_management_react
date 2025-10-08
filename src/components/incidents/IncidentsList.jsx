import React from 'react';
import { Link } from 'react-router-dom';

const IncidentsList = ({ incidents }) => {
  console.log(incidents);
  if (!incidents.rows || incidents.rows.length === 0) {
    return <p>No incidents found.</p>;
  }

  return (
    <table>
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
            <td>{incident.id}</td>
            <td>{incident.title}</td>
            <td>{incident.status}</td>
            <td>{incident.severity}</td>
            <td>
              <Link to={`/incidents/${incident.id}`}>View Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IncidentsList;