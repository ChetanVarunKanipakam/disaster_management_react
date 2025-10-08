import api from '../../utils/api';

export const getAnnouncements = () => {
  return api.get('/announcements');
};

export const createAnnouncement = (announcementData) => {
  return api.post('/announcements', announcementData);
};