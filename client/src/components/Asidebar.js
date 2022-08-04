import React, { useState, useEffect } from 'react';
import { useAuthGlobalContext } from '../actions/auth';
import { Link, NavLink } from 'react-router-dom';
const Asidebar = ({ show }) => {
  const { user, isAuthenticated, logout } = useAuthGlobalContext();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        setDesktop(false);
      } else {
        setDesktop(true);
      }
    });
    if (window.innerWidth <= 768) {
      setDesktop(false);
    } else {
      setDesktop(true);
    }
    console.log(desktop);
  }, []);
  const Logout = () => {
    // resetTheme();
    logout();
  };
  return (
    <aside
      className={`sidemenu  ${show && 'show'} ${
        desktop ? 'desktop' : 'mobile'
      }`}
    >
      <ul>
        <li>
          <NavLink activeclassname='active' to='/'>
            <i className='fa-solid fa-home'></i>
            Home
          </NavLink>
        </li>
        {user && isAuthenticated ? (
          <>
            <li>
              <NavLink activeclassname='active' to='/dashboard'>
                <i class='fa-solid fa-table-columns'></i>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname='active' to='/account'>
                <i className='fa-solid fa-user'></i>
                Account
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname='active' to='/subscriptions'>
                <i class='fa-solid fa-square-rss'></i>
                Subscriptions
              </NavLink>
            </li>
          </>
        ) : (
          ''
        )}

        <li>
          <NavLink activeclassname='active' to='/profiles'>
            <i className='fa-solid fa-users'></i>
            Profiles
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname='active' to='/channels'>
            <i className='fa-solid fa-clapperboard'></i>
            Channels
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname='active' to='/settings'>
            <i className='fa-solid fa-cog'></i>
            Settings
          </NavLink>
        </li>
        {user && isAuthenticated ? (
          <li>
            <a onClick={Logout} href='/'>
              <i className='fa-solid fa-arrow-right-from-bracket'></i>
              Logout
            </a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </aside>
  );
};
export default Asidebar;
