import React from 'react';
import { Link } from 'react-router-dom';

const VolunteersList = ({ volunteers }) => {
  if (!volunteers || volunteers.length === 0) {
    return <p>No volunteers found.</p>;
  }
  console.log(volunteers);
  return (
    <table>
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
          <tr key={volunteer.userId}>
            <td>{volunteer.userProfile.name}</td>
            <td>{volunteer.userProfile.email}</td>
            <td>
              <span style={{ color: volunteer.isAvailable ? 'green' : 'red' }}>
                {volunteer.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </td>
            <td>{volunteer.phone || 'N/A'}</td>
            <td>
              <Link to={`/volunteers/${volunteer.userId}`}>View Profile</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteersList;