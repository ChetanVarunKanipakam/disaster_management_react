import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserRole, banUser } from '../../features/users/usersSlice';
import '../volunteers/Lists.css';

const UsersList = ({ users }) => {
  const dispatch = useDispatch();

  const handlePromote = (id) => {
    dispatch(changeUserRole({ id, role: 'VOLUNTEER' }));
  };

  const handleBan = (id) => {
    dispatch(banUser(id));
  };

  if (!users || users.length === 0) {
    return <p className="list-empty">No users found.</p>;
  }

  return (
    <div className="list-card">
      <div className="list-header-row">
        <h2 className="list-title">Users</h2>
        <div className="list-sub">Promote, manage or ban platform users</div>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
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
              <tr key={user.id || user._id}>
                <td className="td-name">{user.name}</td>
                <td className="td-mono">{user.email}</td>
                <td>
                  <span className="role-tag">{user.role}</span>
                </td>
                <td>
                  <button className="btn btn-ghost" onClick={() => handlePromote(user.id)}>Promote to Volunteer</button>
                  <button className="btn btn-danger" onClick={() => handleBan(user.id)} style={{ marginLeft: '8px' }}>Ban User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
