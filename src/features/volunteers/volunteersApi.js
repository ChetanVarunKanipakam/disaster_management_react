import api from '../../utils/api';

export const getStats = () => api.get('/volunteers/stats');
export const getVolunteers = () => api.get('/volunteers');
export const getVolunteerById = (id) => api.get(`/volunteers/${id}`);

// New function to fetch a volunteer's incident history
export const getIncidentHistory = (volunteerId) => {
  return api.get(`/incidents/assigned-to/${volunteerId}`);
};