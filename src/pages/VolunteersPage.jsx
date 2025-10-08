import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers } from '../features/volunteers/volunteersSlice';
import VolunteersList from '../components/volunteers/VolunteersList';

const VolunteersPage = () => {
  const dispatch = useDispatch();
  const { list: volunteers, status, error } = useSelector((state) => state.volunteers);

  useEffect(() => {
    // Only fetch if the list is empty
    if (volunteers.length === 0) {
      dispatch(fetchVolunteers());
    }
  }, [dispatch, volunteers.length]);
  console.log(volunteers);
  if (status === 'loading') return <p>Loading volunteers...</p>;
  if (status === 'failed') return <p>Error fetching volunteers: {error}</p>;

  return (
    <div>
      <h1>Volunteer Management</h1>
      <VolunteersList volunteers={volunteers} />
    </div>
  );
};

export default VolunteersPage;