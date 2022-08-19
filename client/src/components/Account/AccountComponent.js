import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthGlobalContext } from '../../actions/auth';

const AccountComponent = ({ toggleAccountBar, user, showAccount }) => {
  const { logout } = useAuthGlobalContext();
  return (
    <div className='account-img avatar'>
      <img
        onClick={toggleAccountBar}
        src={
          user && user.image
            ? `http://localhost:5000/${user.image}`
            : '/img/no-image.png'
        }
        alt=''
      />
      {showAccount && (
        <ul className='settings-container'>
          <li>
            <Link to='/account'>
              <i className='fa-solid fa-user'></i>
              Account
            </Link>
          </li>
          <li>
            <Link to='/settings'>
              <i className='fa-solid fa-cog'></i>
              Settings
            </Link>
          </li>
          <li>
            <a onClick={logout} href='/login'>
              <i className='fa-solid fa-arrow-right-from-bracket'></i>
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountComponent;
