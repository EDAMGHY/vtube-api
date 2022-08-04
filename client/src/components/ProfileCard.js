import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
const ProfileCard = ({ profile }) => {
  const { user, isAuthenticated } = useAuthGlobalContext();
  return (
    <div className='profile-card'>
      {isAuthenticated && profile.user._id === user._id ? (
        <div className='current-user'>
          <Link to='/profile/edit'>
            <i class='fa-solid fa-pen-to-square'></i>
          </Link>
          {/* <button>
            <i class='fa-solid fa-trash-can'></i>
          </button> */}
        </div>
      ) : (
        ''
      )}
      <div className='profile-cover'>
        <img
          src={
            profile && profile.cover
              ? `http://localhost:5000/${profile.cover}`
              : '/img/no-cover.png'
          }
          alt=''
        />
      </div>
      <div className='profile-image'>
        <img
          src={
            profile && profile.image
              ? `http://localhost:5000/${profile.image}`
              : '/img/no-image.png'
          }
          alt=''
        />
      </div>
      <div className='info'>
        <h4 className='name'>{profile.user.name}</h4>

        <span className='createdAt'>
          Member since : {new Date(profile.createdAt).toLocaleDateString()}{' '}
        </span>
        <Link to={`/profiles/${profile.user._id}`} className='btn-2'>
          View Profile
        </Link>
      </div>
    </div>
  );
};
export default ProfileCard;
