import api from '../../utils/api';

// This file contains functions that make API calls related to incidents.
// We're using our central 'api' instance.

export const getStats = () => api.get('/incidents/stats');
export const getRecent = () => api.get('/incidents/recent');
export const getIncidents = (params) => api.get('/incidents', { params });
export const getIncidentById = (id) => api.get(`/incidents/${id}`);
export const assignVolunteer = (id, volunteerId) => api.put(`/incidents/${id}/assign`, { volunteerId });
export const updateStatus = (id, status) => api.put(`/incidents/${id}/status`, { status });