import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignVolunteer, updateStatus } from '../../features/incidents/incidentsApi';
import { fetchIncidentDetails } from '../../features/incidents/incidentsSlice';
import { Link } from 'react-router-dom';
import './IncidentDetails.css';

const IncidentDetails = ({ incident, volunteers, volunteerStatus }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(incident.status);

  const handleAssign = async (volunteerId) => {
    if (!volunteerId) {
      alert('Please select a volunteer.');
      return;
    }
    try {
      await assignVolunteer(incident.id, volunteerId); 
      alert('Volunteer assigned successfully!');
      dispatch(fetchIncidentDetails(incident.id));
    } catch (error) {
      alert('Failed to assign volunteer.');
      console.error(error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateStatus(incident.id, selectedStatus);
      alert('Status updated successfully!');
      dispatch(fetchIncidentDetails(incident.id));
    } catch (error) {
      alert('Failed to update status.');
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'RESOLVED':
        return 'status-resolved';
      case 'IN_PROGRESS':
        return 'status-progress';
      case 'CLOSED':
        return 'status-closed';
      case 'ACKNOWLEDGED':
        return 'status-acknowledged';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="incident-details-container">
      {/* Header */}
      <div className="incident-header">
        <div className="incident-title-section">
          <h1 className="incident-title">{incident.title}</h1>
          <p className="incident-metadata">
            Reported by <span className="reporter-name">{incident.reporter.name || 'N/A'}</span> on{' '}
            {new Date(incident.createdAt).toLocaleString()}
          </p>
        </div>
        <span className={`status-badge ${getStatusClass(incident.status)}`}>
          {incident.status}
        </span>
      </div>

      {/* Info grid */}
      <div className="incident-grid">
        <div className="incident-info">
          <div className="info-item">
            <strong>ID:</strong> <span>{incident.id}</span>
          </div>
          <div className="info-item">
            <strong>Type:</strong> <span>{incident.type}</span>
          </div>
          <div className="info-item">
            <strong>Severity:</strong> <span className="severity-badge">{incident.severity}</span>
          </div>
          <div className="info-item">
            <strong>Description:</strong> <span className="description-text">{incident.description}</span>
          </div>
          <div className="info-item">
            <strong>Assigned To:</strong>{' '}
            <span>
              {incident.assignedVolunteer
                ? incident.assignedVolunteer.name
                : 'Not Assigned'}
            </span>
          </div>
        </div>

        {incident.photoUrl && (
          <div className="incident-photo-container">
            <img
              src={`http://localhost:4000${incident.photoUrl}`}
              alt="Incident"
              className="incident-photo"
            />
          </div>
        )}
      </div>

      <hr className="divider" />

      {/* Update Status */}
      <div className="action-card">
        <h2 className="card-title">Update Status</h2>
        <div className="status-controls">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            <option value="PENDING">Pending</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="btn btn-primary"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Assign Volunteer */}
      <div className="action-card volunteer-card">
        <h2 className="card-title">Assign Nearby Volunteer</h2>

        {volunteerStatus === 'loading' ? (
          <p className="loading-text">Loading nearby volunteers...</p>
        ) : volunteers.length === 0 ? (
          <p className="no-data-text">No available volunteers found nearby.</p>
        ) : (
          <ul className="volunteer-list">
            {volunteers.map((v) => (
              <li key={v.userId} className="volunteer-item">
                <div className="volunteer-info">
                  <p className="volunteer-name">{v.userProfile.name}</p>
                  {v.distance && (
                    <p className="volunteer-distance">
                      Distance: {(v.distance / 1000).toFixed(2)} km
                    </p>
                  )}
                </div>
                <div className="availability-badge">
                  {v.isAvailable ? (
                    <span className="badge-available">Available</span>
                  ) : (
                    <span className="badge-unavailable">Not Available</span>
                  )}
                </div>
                <div className="volunteer-actions">
                  <Link
                    to={`/admin/volunteers/${v.userId}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAssign(v.userId)}
                    className="btn btn-assign"
                  >
                    Assign
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncidentDetails;