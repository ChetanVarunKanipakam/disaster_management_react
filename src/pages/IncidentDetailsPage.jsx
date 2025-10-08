import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// --- ADD clearCurrentIncident ---
import { fetchIncidentDetails, clearCurrentIncident } from '../features/incidents/incidentsSlice';
import { fetchVolunteers } from '../features/volunteers/volunteersSlice';
import IncidentDetails from '../components/incidents/IncidentDetails';

const IncidentDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentIncident, status: incidentStatus } = useSelector((state) => state.incidents);
  const { list: volunteers, status: volunteerStatus } = useSelector((state) => state.volunteers);

  // Effect for fetching the incident (only runs when 'id' changes)
  useEffect(() => {
    if (id) {
      dispatch(fetchIncidentDetails(id));
    }
    // Cleanup function: runs when the component unmounts
    // This prevents showing the old incident details for a moment when navigating
    // to a new incident details page.
    return () => {
      dispatch(clearCurrentIncident());
    }
  }, [id, dispatch]);

  // Effect for fetching volunteers (only runs once if the list is empty)
  useEffect(() => {
    if (volunteers.length === 0) {
      dispatch(fetchVolunteers());
    }
  }, [volunteers.length, dispatch]);

  if (incidentStatus === 'loading') return <p>Loading incident details...</p>;
  
  // This check is important. If the API call failed, status would be 'failed'
  // and currentIncident might still be null.
  if (!currentIncident) return <p>Incident not found.</p>;

  return (
    <div>
      <IncidentDetails
        incident={currentIncident}
        volunteers={volunteers.filter(v => v.isAvailable)}
        volunteerStatus={volunteerStatus}
      />
    </div>
  );
};

export default IncidentDetailsPage;