import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignVolunteer, updateStatus } from '../../features/incidents/incidentsApi';
import { fetchIncidentDetails } from '../../features/incidents/incidentsSlice';
import { Link } from 'react-router-dom';
const IncidentDetails = ({ incident, volunteers, volunteerStatus }) => {
  const dispatch = useDispatch();
  // const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(incident.status);

  const handleAssign = async (volunteerId) => {
    if (!volunteerId) {
      alert('Please select a volunteer.');
      return;
    }
    try {
      // Use the volunteerId passed to the function
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

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {incident.title}
          </h1>
          <p className="text-sm text-gray-500">
            Reported by <span className="font-medium">{incident.reporter.name || 'N/A'}</span> on{' '}
            {new Date(incident.createdAt).toLocaleString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            incident.status === 'RESOLVED'
              ? 'bg-green-100 text-green-700'
              : incident.status === 'IN_PROGRESS'
              ? 'bg-yellow-100 text-yellow-700'
              : incident.status === 'CLOSED'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {incident.status}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p>
            <strong className="text-gray-700">ID:</strong> {incident.id}
          </p>
          <p>
            <strong className="text-gray-700">Type:</strong> {incident.type}
          </p>
          <p>
            <strong className="text-gray-700">Severity:</strong>{' '}
            <span className="font-medium text-red-600">{incident.severity}</span>
          </p>
          <p>
            <strong className="text-gray-700">Description:</strong>{' '}
            <span className="text-gray-600">{incident.description}</span>
          </p>
          <p>
            <strong className="text-gray-700">Assigned To:</strong>{' '}
            {incident.assignedVolunteer
              ? incident.assignedVolunteer.name
              : 'Not Assigned'}
          </p>
        </div>

        {incident.photoUrl && (
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:4000${incident.photoUrl}`}
              alt="Incident"
              className="rounded-xl w-full max-w-md shadow-md border border-gray-200"
            />
          </div>
        )}
      </div>

      <hr className="my-8 border-gray-200" />

      {/* Update Status */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Update Status
        </h2>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="PENDING">Pending</option>
            <option value="ACKNOWLEDGED">ACKNOWLEDGED </option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            
          </select>
          <button
            onClick={handleStatusUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Assign Volunteer */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Assign Nearby Volunteer
        </h2>

        {volunteerStatus === 'loading' ? (
          <p className="text-gray-500 text-sm">Loading nearby volunteers...</p>
        ) : volunteers.length === 0 ? (
          <p className="text-gray-500 text-sm">No available volunteers found nearby.</p>
        ) : (
          <ul className="space-y-3">
            {volunteers.map((v) => (
              <li 
                key={v.userId} 
                className="flex flex-wrap justify-between items-center bg-white p-3 rounded-lg border"
              >
                <div>
                  <p className="font-semibold text-gray-800">{v.userProfile.name}</p>
                  {v.distance && (
                     <p className="text-sm text-gray-500">
                        Distance: {(v.distance / 1000).toFixed(2)} km
                     </p>
                  )}
                </div>
                {v.isAvailable?<div className="text-green-500">Available</div>:<div className="text-red-500">NotAvailable</div>}
                <div className="flex items-center gap-3">
                  <Link
                    to={`/volunteers/${v.userId}`}
                    className="px-4 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                  >
                    View Details
                  </Link>
                  <button
                    // The onClick handler is now correct because handleAssign accepts the ID
                    onClick={() => handleAssign(v.userId)}
                    className="px-5 py-1.5 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition"
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
