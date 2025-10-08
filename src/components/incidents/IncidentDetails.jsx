import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignVolunteer, updateStatus } from '../../features/incidents/incidentsApi';
import { fetchIncidentDetails } from '../../features/incidents/incidentsSlice';

const IncidentDetails = ({ incident, volunteers, volunteerStatus }) => {
  const dispatch = useDispatch();
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(incident.status);
  console.log(incident,volunteerStatus,volunteers)
  const handleAssign = async () => {
    if (!selectedVolunteer) {
      alert('Please select a volunteer.');
      return;
    }
    try {
      await assignVolunteer(incident.id, selectedVolunteer);
      alert('Volunteer assigned successfully!');
      dispatch(fetchIncidentDetails(incident.id)); // Refresh details
    } catch (error) {
      alert('Failed to assign volunteer.');
      console.error(error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateStatus(incident.id, selectedStatus);
      alert('Status updated successfully!');
      dispatch(fetchIncidentDetails(incident.id)); // Refresh details
    } catch (error) {
      alert('Failed to update status.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Incident: {incident.title}</h1>
      <p><strong>ID:</strong> {incident.id}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Type:</strong> {incident.type}</p>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p><strong>Reported At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
      <p><strong>Reported By:</strong> {incident.reporter.name || 'N/A'}</p>
      <p><strong>Assigned To:</strong> {incident.assignedVolunteer? incident.assignedVolunteer.name || 'Not Assigned':"Not Assignmend"}</p>

      {incident.photoUrl && <img src={`http://localhost:4000${incident.photoUrl}`} alt="Incident" style={{ maxWidth: '400px', marginTop: '10px' }} />}

      <hr style={{ margin: '20px 0' }} />

      <div>
        <h2>Update Status</h2>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
        <button onClick={handleStatusUpdate} style={{ marginLeft: '10px' }}>Update Status</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Assign Volunteer</h2>
        {volunteerStatus === 'loading' ? (
          <p>Loading available volunteers...</p>
        ) : (
          <>
            <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}>
              <option value="">-- Select an available volunteer --</option>
              {volunteers.map((v) => (
                <option key={v.userId} value={v.userId}>{v.userProfile.name}</option>
              ))}
            </select>
            <button onClick={handleAssign} style={{ marginLeft: '10px' }}>Assign</button>
          </>
        )}
      </div>
    </div>
  );
};

export default IncidentDetails;