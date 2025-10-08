import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteerProfile, fetchIncidentHistory, clearCurrentProfile } from '../features/volunteers/volunteersSlice';
import VolunteerProfile from '../components/volunteers/VolunteerProfile';

const VolunteerProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentProfile, incidentHistory, status, error } = useSelector((state) => state.volunteers);

  useEffect(() => {
    if (id) {
      dispatch(fetchVolunteerProfile(id));
      dispatch(fetchIncidentHistory(id));
    }

    // Cleanup function to clear the profile data when the component unmounts
    return () => {
      dispatch(clearCurrentProfile());
    };
  }, [id, dispatch]);

  if (status === 'loading') return <p>Loading volunteer profile...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!currentProfile) return <p>Volunteer not found.</p>;

  return (
    <VolunteerProfile profile={currentProfile} history={incidentHistory} />
  );
};

export default VolunteerProfilePage;