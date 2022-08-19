import React from 'react';
import { Link } from 'react-router-dom';

function EdtiProfileComponent() {
  return (
    <div className='edit'>
      <h2>Edit Profile</h2>
      <p>You can edit your profile!</p>
      <Link to='/profile/edit' className='btn-2'>
        <i className='fa-solid fa-user'></i> Edit Profile
      </Link>
    </div>
  );
}

export default EdtiProfileComponent;
