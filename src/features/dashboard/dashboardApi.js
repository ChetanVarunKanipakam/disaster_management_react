import api from '../../utils/api';

// Main dashboard stats from the '/dashboard/stats' route
export const getDashboardStats = () => {
  return api.get('/dashboard/stats');
};

// Detailed reports from the '/reports' route
export const getIncidentsReport = () => {
  return api.get('/reports/incidents');
};

export const getResponseTimesReport = () => {
  return api.get('/reports/response-times');
};

export const getHotspotsReport = () => {
  return api.get('/reports/hotspots');
};