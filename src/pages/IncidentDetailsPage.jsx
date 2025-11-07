import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidentDetails, clearCurrentIncident } from '../features/incidents/incidentsSlice';
import { fetchVolunteers } from '../features/volunteers/volunteersSlice';
import IncidentDetails from '../components/incidents/IncidentDetails';

const IncidentDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentIncident, status: incidentStatus } = useSelector((state) => state.incidents);
  const { list: volunteers, status: volunteerStatus } = useSelector((state) => state.volunteers);

  // Effect for fetching the incident
  useEffect(() => {
    if (id) {
      dispatch(fetchIncidentDetails(id));
    }
    return () => {
      dispatch(clearCurrentIncident());
    }
  }, [id, dispatch]);

  // --- MODIFIED ---
  // Effect for fetching nearby volunteers once the incident is loaded
  useEffect(() => {
    if (currentIncident && currentIncident.location) {
      const [lon, lat] = currentIncident.location.coordinates;
      // Fetch volunteers based on the incident's location
      dispatch(fetchVolunteers({ lat, lon, radius: 20000 })); // Radius of 20km
    }
  }, [currentIncident, dispatch]);
  console.log(volunteers)
  console.log(volunteerStatus)
  if (incidentStatus === 'loading') return <p>Loading incident details...</p>;
  
  if (!currentIncident) return <p>Incident not found.</p>;

  return (
    <div>
      <IncidentDetails
        incident={currentIncident}
        volunteers={volunteers} // No need to filter here anymore
        volunteerStatus={volunteerStatus}
      />
    </div>
  );
};

export default IncidentDetailsPage;