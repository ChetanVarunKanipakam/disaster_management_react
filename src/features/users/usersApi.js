import api from '../../utils/api';

export const getUsers = (role) => api.get('/users', { params: { role } });
export const updateUserRole = (id, role) => api.put(`/users/${id}/role`, { role });
export const deleteUser = (id) => api.delete(`/users/${id}`);