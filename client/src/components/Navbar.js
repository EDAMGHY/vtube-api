import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProfileGlobalContext } from '../actions/profile';
import { useThemeGlobalContext } from '../actions/theme';
import { useSearchGlobalContext } from '../actions/search';
import NotificationsList from './Notifications/NotificationsList';
import AccountComponent from './Account/AccountComponent';

const Navbar = ({ setShow, show }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const [showAccount, setShowAccount] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuthGlobalContext();
  const { profile } = useProfileGlobalContext();
  const { search, setSearch, setCat, cat } = useSearchGlobalContext();

  const showSearchBar = () => {
    setShowSearch(true);
  };
  const hideSearchBar = () => {
    setShowSearch(false);
  };

  const onClick = () => {
    navigate('/search');
  };
  const toggleAccountBar = () => {
    setShowNotification(false);
    setShowAccount(!showAccount);
  };
  const toggleSideBar = () => {
    setShow(!show);
    console.log(show);
  };
  const Logout = () => {
    // resetTheme();
    logout();
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 650) {
        setShowSearch(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userProfile && !profile) {
      setUser(userProfile);
    } else {
      setUser(profile);
    }
  }, [userProfile, profile]);

  return (
    <nav className={`nav ${showSearch ? 'toggle-search' : 'original-nav'}`}>
      <div className='nav-container'>
        <button onClick={toggleSideBar} className='menu'>
          <i className='fa-solid fa-bars'></i>
        </button>
        <div className='logo-container'>
          <Link to='/'>
            <img src='/img/logo192.png' alt='vTube Logo...' />
          </Link>
        </div>
        <div className='search-section center gap-1'>
          <button onClick={hideSearchBar} className='back-arrow'>
            <i className='fa-solid fa-arrow-left'></i>
          </button>
          <div className='search-container center'>
            <input
              type='text'
              placeholder='Search...'
              name='term'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              id='search'
              name='cat'
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className='select'
            >
              <option value='all'>all</option>
              <option value='videos'>videos</option>
              <option value='channels'>channels</option>
              <option value='tags'>tags</option>
              <option value='users'>users</option>
            </select>
            <button onClick={onClick}>
              <i className='fa-solid fa-search'></i>
            </button>
          </div>
        </div>
        {isAuthenticated ? (
          <div className='account-section center'>
            <button onClick={showSearchBar} className='search-button'>
              <i className='fa-solid fa-search'></i>
            </button>
            <NotificationsList
              setShowNotification={setShowNotification}
              showNotification={showNotification}
              setShowAccount={setShowAccount}
            />
            <AccountComponent
              showAccount={showAccount}
              toggleAccountBar={toggleAccountBar}
              user={user}
            />
          </div>
        ) : (
          <div className='auth-btns'>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
