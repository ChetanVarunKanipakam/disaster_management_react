import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements, createNewAnnouncement } from '../features/announcements/announcementsSlice';
import './AdminFeatures.css'; // New shared CSS file for these pages

const AnnouncementsPage = () => {
  const dispatch = useDispatch();
  const { list: announcements, status } = useSelector((state) => state.announcements);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert('Title and message are required.');
      return;
    }
    dispatch(createNewAnnouncement({ title, message }));
    // Clear form fields
    setTitle('');
    setMessage('');
  };

  return (
    <div>
      <h1>Announcements</h1>
      <div className="announcement-container">
        <div className="form-container card">
          <h2>Create New Announcement</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Announcement Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
            ></textarea>
            <button type="submit">Send Announcement</button>
          </form>
        </div>
        <div className="list-container">
          <h2>Sent Announcements</h2>
          {status === 'loading' && <p>Loading...</p>}
          {announcements.map(ann => (
            <div key={ann.id} className="announcement-card card">
              <h3>{ann.title}</h3>
              <p>{ann.message}</p>
              <small>Sent on: {new Date(ann.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;