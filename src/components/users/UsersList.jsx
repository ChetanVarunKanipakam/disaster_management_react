import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserRole, banUser } from '../../features/users/usersSlice';

const UsersList = ({ users }) => {
  const dispatch = useDispatch();

  const handlePromote = (id) => {
    dispatch(changeUserRole({ id, role: 'volunteer' }));
  };

  const handleBan = (id) => {
    dispatch(banUser(id));
  };

  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => handlePromote(user.id)}>Promote to Volunteer</button>
              <button onClick={() => handleBan(user.id)} style={{ marginLeft: '8px', backgroundColor: '#dc3545' }}>Ban User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;