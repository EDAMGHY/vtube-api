import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProfileGlobalContext } from '../actions/profile';
import { useChannelGlobalContext } from '../actions/channel';
import Section from '../components/Section';
const Account = () => {
  const navigate = useNavigate();
  const { deleteAccount, userChannel } = useAuthGlobalContext();
  const { channel } = useChannelGlobalContext();
  const { clearProfile } = useProfileGlobalContext();
  const deleteTheAccount = () => {
    deleteAccount();
    clearProfile();
    window.alert('User Account Deleted Permanently...!');
    navigate('/');
  };
  return (
    <Section nameClass='account'>
      <h3 className='h3 my-2'>
        Hi again <span className='primary'>Abdell</span>,
      </h3>
      <p className='main-2'>
        Manage You Account by Either Create or Edit Your Channel/Profile or Even
        Delete it!
      </p>
      <div className='edit'>
        <h2>Edit Profile</h2>
        <p>You can edit your profile!</p>
        <Link to='/profile/edit' className='btn-2'>
          <i className='fa-solid fa-user'></i> Edit Profile
        </Link>
      </div>
      <div className='edit'>
        <h2>
          {' '}
          {channel === null && userChannel === null ? 'Add' : 'Edit'} Channel
        </h2>
        <p>
          You can {channel === null && userChannel === null ? 'add' : 'edit'}{' '}
          your channel!
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
      <div className='edit'>
        <h2>Delete Account</h2>
        <p>You can delete your entire account!</p>
        <button onClick={deleteTheAccount} className='btn-2'>
          <i className='fa-solid fa-user-minus'></i> Delete Account
        </button>
      </div>
    </Section>
  );
};
export default Account;
