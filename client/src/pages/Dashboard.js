import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import DashboardVids from '../components/DashboardVids';
import { useAuthGlobalContext } from '../actions/auth';
import { useChannelGlobalContext } from '../actions/channel';
const Dashboard = () => {
  const { userChannel, loading } = useAuthGlobalContext();
  const { channel, deleteChannel } = useChannelGlobalContext();
  const [subnav, setSubnav] = useState('overview');
  const [theChannel, setTheChannel] = useState({});

  const onClick = (e) => {
    setSubnav(e.target.dataset.subnav);
  };
  useEffect(() => {
    if (userChannel && !channel) {
      setTheChannel(userChannel);
    } else {
      setTheChannel(channel);
    }
  }, [userChannel, channel, deleteChannel]);
  return (
    <Section nameClass='dashboard'>
      <div className='single-dashboard'>
        <h3 className='h3'>
          <span className='primary'>Channel's</span> Dashboard
        </h3>
        {theChannel === null ? (
          <>
            {' '}
            <div className='no-channel'>
              <div className='container'>
                <div className='image'>
                  <img src='./img/fondBg.svg' alt='' />
                </div>
                <h2 className='text-center'>
                  Create your own channel and Unleash the power of videos
                </h2>
                <Link to='/channel'>
                  <button className='btn'>Create Channel</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='cover-image'>
              <img
                src={
                  theChannel.cover
                    ? `http://localhost:5000/${theChannel.cover}`
                    : '/img/no-cover.png'
                }
                alt=''
              />
            </div>
            <div className='image-dashboard'>
              <img
                src={
                  theChannel.image
                    ? `http://localhost:5000/${theChannel.image}`
                    : '/img/no-image.png'
                }
                alt=''
              />
              <div>
                <Link to='/video/'>
                  <i className='fa-solid fa-upload'></i>{' '}
                  <span>Upload Video</span>
                </Link>
                <Link to='/channel/edit'>
                  <i className='fa-solid fa-pen-to-square'></i>{' '}
                  <span>Edit</span>
                </Link>
                <Link onClick={() => deleteChannel(theChannel._id)} to=''>
                  <i className='fa-solid fa-trash-can'></i> <span>Delete</span>
                </Link>
              </div>
            </div>
            <nav className='dashboard-nav'>
              <ul>
                <li>
                  <button
                    data-subnav='overview'
                    onClick={onClick}
                    className={subnav === 'overview' ? 'active' : ''}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    data-subnav='videos'
                    onClick={onClick}
                    className={subnav === 'videos' ? 'active' : ''}
                  >
                    Videos
                  </button>
                </li>
              </ul>
            </nav>
            {subnav === 'overview' ? (
              <div className='info'>
                <h3 className='h2 name'>
                  {theChannel.title}{' '}
                  <i className='fa-solid fa-check check small'></i>
                </h3>
                <h3 className='subs'>
                  {theChannel.subscribers && theChannel.subscribers.length}{' '}
                  Subscribers
                </h3>
                <div className='bio'>
                  <h4>Bio</h4>
                  <span>{theChannel.description}</span>
                </div>
                {/* <div>
                  <h4>Location</h4>
                  <span className='location'>Morocco</span>
                </div> */}
                <div>
                  <h4>Channel Created At</h4>
                  <span className='createdAt'>
                    {theChannel.createdAt &&
                      new Date(theChannel.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <DashboardVids name='dashboard' channelID={theChannel._id} />
            )}
          </>
        )}
      </div>
    </Section>
  );
};
export default Dashboard;
