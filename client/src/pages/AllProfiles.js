import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfileGlobalContext } from '../actions/profile';
import ProfileCard from '../components/ProfileCard';
const AllProfiles = () => {
  const { getProfiles, profiles, loading } = useProfileGlobalContext();
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <main className='profiles'>
      <div className='container'>
        <h3 className='h3'>Profiles</h3>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className='profiles-card'>
            {profiles.map((profile, index) => (
              <ProfileCard key={index} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default AllProfiles;
