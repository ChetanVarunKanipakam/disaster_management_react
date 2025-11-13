import React from 'react';
import { Link } from 'react-router-dom';
import './Lists.css';

const VolunteersList = ({ volunteers }) => {
  if (!volunteers || volunteers.length === 0) {
    return <p className="list-empty">No volunteers found.</p>;
  }
  console.log(volunteers);
  return (
    <div className="list-card">
      <div className="list-header-row">
        <h2 className="list-title">Volunteers</h2>
        <div className="list-sub">Manage volunteer availability and profiles</div>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Availability</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              // The API should return the user's ID as 'userId' or 'id'
              <tr key={volunteer.userId || volunteer.id || volunteer._id}>
                <td className="td-name">{volunteer.userProfile.name}</td>
                <td className="td-mono">{volunteer.userProfile.email}</td>
                <td>
                  <span className={`status-dot ${volunteer.isAvailable ? 'available' : 'unavailable'}`}>
                    {volunteer.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="td-mono">{volunteer.phone || 'N/A'}</td>
                <td>
                  <Link to={`/admin/volunteers/${volunteer.userId || volunteer.id || volunteer._id}`} className="action-link">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteersList;
