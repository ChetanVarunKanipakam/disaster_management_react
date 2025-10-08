import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import UsersList from '../components/users/UsersList';

const UserManagementPage = () => {
    const dispatch = useDispatch();
    const { list: users, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers('citizen'));
    }, [dispatch]);

    if (status === 'loading') return <p>Loading users...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Management</h1>
            <UsersList users={users} />
        </div>
    );
};

export default UserManagementPage;