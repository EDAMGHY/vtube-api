import React from 'react';
import { Link } from 'react-router-dom';

function EditChannelComponent({ channel, userChannel }) {
  return (
    <div className='edit'>
      <h2>
        {' '}
        {channel === null && userChannel === null ? 'Add' : 'Edit'} Channel
      </h2>
      <p>
        You can {channel === null && userChannel === null ? 'add' : 'edit'} your
        channel!
      </p>
      <Link
        to={`/channel/${
          channel === null && userChannel === null ? '' : 'edit'
        }`}
        className='btn-2'
      >
        <i className='fa-solid fa-clapperboard'></i>{' '}
        {channel === null && userChannel === null ? 'Add' : 'Edit'} Channel
      </Link>
    </div>
  );
}

export default EditChannelComponent;
