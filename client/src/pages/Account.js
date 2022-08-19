import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProfileGlobalContext } from '../actions/profile';
import { useChannelGlobalContext } from '../actions/channel';
import Section from '../components/Section';
import EdtiProfileComponent from '../components/EdtiProfileComponent';
import EditChannelComponent from '../components/EdtiChannelComponent';
import DeleteAccount from '../components/DeleteAccount';
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
      <EdtiProfileComponent />
      <EditChannelComponent channel={channel} userChannel={userChannel} />
      <DeleteAccount deleteTheAccount={deleteTheAccount} />
    </Section>
  );
};
export default Account;
