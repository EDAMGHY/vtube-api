import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfileGlobalContext } from '../actions/profile';
import { useAuthGlobalContext } from '../actions/auth';
const SingleProfile = () => {
  const { getProfileByID, singleProfile, loading } = useProfileGlobalContext();
  const { user, isAuthenticated } = useAuthGlobalContext();
  const { id } = useParams();
  useEffect(() => {
    getProfileByID(id);
  }, [getProfileByID, id]);
  return (
    <main className='profiles'>
      <div className='container'>
        {singleProfile === null ? (
          <h2>Loading</h2>
        ) : (
          <>
            <h3 className='h3'>
              <span className='primary'>{singleProfile.user.name}</span>'s
              Profile
            </h3>
            <div className='single-profile'>
              <div className='cover-image'>
                <img
                  src={
                    singleProfile.cover
                      ? `http://localhost:5000/${singleProfile.cover}`
                      : '/img/no-cover.png'
                  }
                  alt=''
                />
              </div>
              <div className='image-profile'>
                <img
                  src={
                    singleProfile.image
                      ? `http://localhost:5000/${singleProfile.image}`
                      : '/img/no-image.png'
                  }
                  alt=''
                />
              </div>
              <div className='info'>
                {isAuthenticated && singleProfile.user._id === user._id ? (
                  <Link className='btn-rounded' to='/profile/edit'>
                    <i className='fa-solid fa-pen-to-square'></i>
                  </Link>
                ) : (
                  ''
                )}

                <h3 className='h2 name'>{singleProfile.user.name}</h3>
                <div className='bio'>{singleProfile.bio}</div>
                <span className='location'>
                  Location : {singleProfile.location}
                </span>
                <span className='createdAt'>
                  Member since :{' '}
                  {new Date(singleProfile.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default SingleProfile;
