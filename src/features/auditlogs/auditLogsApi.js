import api from '../../utils/api';

export const getAuditLogs = () => {
  return api.get('/audit-logs');
};