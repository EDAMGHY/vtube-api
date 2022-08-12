import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProfileGlobalContext } from '../actions/profile';
import { useThemeGlobalContext } from '../actions/theme';
import { useSearchGlobalContext } from '../actions/search';
import { shortenText, timeSince } from '../utils/utilities';
const Navbar = ({ setShow, show }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuthGlobalContext();
  const {
    profile,
    notifications,
    unseen,
    getNotifications,
    updateNotifications,
  } = useProfileGlobalContext();
  const { resetTheme } = useThemeGlobalContext();
  const { search, setSearch, setCat, cat } = useSearchGlobalContext();
  const showSearchBar = () => {
    setShowSearch(true);
  };
  const hideSearchBar = () => {
    setShowSearch(false);
  };

  const toggleNotification = () => {
    setShowAccount(false);
    setShowNotification(!showNotification);
    updateNotifications();
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
    getNotifications();
    if (userProfile && !profile) {
      setUser(userProfile);
    } else {
      setUser(profile);
    }
  }, [userProfile, profile, getNotifications]);

  return (
    <nav className={`nav ${showSearch ? 'toggle-search' : 'original-nav'}`}>
      <div className='nav-container'>
        <button onClick={toggleSideBar} className='menu'>
          <i className='fa-solid fa-bars'></i>
        </button>
        <div className='logo-container'>
          <Link to='/'>
            {/* <img src='/img/logo-1.svg' alt='vTube Logo...' /> */}
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
            {/* Notification Component Here */}
            <button class='noti-button' onClick={toggleNotification}>
              {unseen !== 0 && <span class='num'> {unseen}</span>}
              <i class='fa-solid fa-bell'></i>
              <ul
                class={`notification-container  scrollbar ${
                  showNotification ? '' : 'none'
                }`}
              >
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((item) =>
                      (() => {
                        switch (item.type) {
                          case 'subscribe':
                            return (
                              <Link to={`/channels/${item.channel.user}`}>
                                <li
                                  style={{
                                    gridTemplateColumns: '0.25fr 1.75fr',
                                  }}
                                >
                                  <div class='channel-img'>
                                    <img
                                      src={
                                        item.channel.image
                                          ? `http://localhost:5000/${item.channel.image}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.channel.title}
                                    />
                                  </div>
                                  <div class='noti-info'>
                                    <p>
                                      You subscribed to &lt;{' '}
                                      {item.channel.title} &gt;
                                    </p>
                                    <span> {timeSince(item.createdAt)} </span>
                                  </div>
                                </li>
                              </Link>
                            );
                          case 'like':
                            return (
                              <Link
                                to={`videos/${item.channel.title}/${item.video._id}`}
                              >
                                <li
                                  style={{
                                    gridTemplateColumns: '0.5fr 2.5fr 1fr',
                                  }}
                                >
                                  <div class='channel-img'>
                                    <img
                                      src={
                                        item.user.image
                                          ? `http://localhost:5000/${item.user.image}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.user.name}
                                    />
                                  </div>
                                  <div class='noti-info'>
                                    <p>{item.user.name} liked your video.</p>
                                    <span> {timeSince(item.createdAt)} </span>
                                  </div>
                                  <div class='video-img'>
                                    <img
                                      src={
                                        item.video.thumbnail
                                          ? `http://localhost:5000/${item.video.thumbnail}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.video.title}
                                    />
                                  </div>
                                </li>
                              </Link>
                            );
                          case 'comment':
                            return (
                              <Link
                                to={`videos/${item.channel.title}/${item.video._id}`}
                              >
                                <li
                                  style={{
                                    gridTemplateColumns: '0.5fr 2.5fr 1fr',
                                  }}
                                >
                                  <div class='channel-img'>
                                    <img
                                      src={
                                        item.user.image
                                          ? `http://localhost:5000/${item.user.image}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.user.name}
                                    />
                                  </div>
                                  <div class='noti-info'>
                                    <p>
                                      {item.user.name} commented on your video.
                                    </p>
                                    <span> {timeSince(item.createdAt)} </span>
                                  </div>
                                  <div class='video-img'>
                                    <img
                                      src={
                                        item.video.thumbnail
                                          ? `http://localhost:5000/${item.video.thumbnail}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.video.title}
                                    />
                                  </div>
                                </li>
                              </Link>
                            );
                          case 'upload':
                            return (
                              <Link
                                to={`videos/${item.channel.title}/${item.video._id}`}
                              >
                                <li
                                  style={{
                                    gridTemplateColumns: '0.5fr 2.5fr 1fr',
                                  }}
                                >
                                  <div class='channel-img'>
                                    <img
                                      src={
                                        item.channel.image
                                          ? `http://localhost:5000/${item.channel.image}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.channel.title}
                                    />
                                  </div>
                                  <div class='noti-info'>
                                    <p>
                                      {item.channel.title} just upload a video
                                      titled ${item.video.title}.
                                    </p>
                                    <span> {timeSince(item.createdAt)} </span>
                                  </div>
                                  <div class='video-img'>
                                    <img
                                      src={
                                        item.video.thumbnail
                                          ? `http://localhost:5000/${item.video.thumbnail}`
                                          : './img/no-image.png'
                                      }
                                      alt={item.video.title}
                                    />
                                  </div>
                                </li>
                              </Link>
                            );
                        }
                      })()
                    )}
                  </>
                ) : (
                  <h2 className='text-center'>No Notification</h2>
                )}
              </ul>
            </button>
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
                    <a onClick={Logout} href='/'>
                      <i className='fa-solid fa-arrow-right-from-bracket'></i>
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
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
