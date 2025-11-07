import api from '../../utils/api';

export const getStats = () => api.get('/volunteers/stats');
export const getVolunteers = (params) => api.get('/volunteers', { params });
export const getVolunteerById = (id) => api.get(`/volunteers/${id}`);
export const getVolunteers1 = () => api.get('/volunteers1');
// New function to fetch a volunteer's incident history
export const getIncidentHistory = (volunteerId) => {
  return api.get(`/incidents/assigned-to/${volunteerId}`);
};