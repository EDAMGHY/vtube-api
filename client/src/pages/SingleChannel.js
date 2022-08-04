import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useChannelGlobalContext } from '../actions/channel';
import { useAuthGlobalContext } from '../actions/auth';
import DashboardVids from '../components/DashboardVids';
const SingleChannel = () => {
  const [subnav, setSubnav] = useState('overview');
  const [subscribed, setSubscribed] = useState(false);
  const [sub, setSub] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const {
    getChannelByID,
    singleChannel,
    loading,
    newChannel,
    deleteChannel,
    subscribeChannel,
    msg,
    unsubscribeChannel,
  } = useChannelGlobalContext();
  const { user, isAuthenticated } = useAuthGlobalContext();

  const { id } = useParams();
  useEffect(() => {
    getChannelByID(id);
  }, [getChannelByID, id]);

  const onClick = (e) => {
    setSubnav(e.target.dataset.subnav);
  };

  useEffect(() => {
    if (singleChannel && user) {
      const isSubscribed = singleChannel.subscribers.some(
        (cha) => cha.user == user._id
      );
      setSub(subscribed);
      setSubscribed(isSubscribed);
    }
  }, [singleChannel, subscribeChannel, unsubscribeChannel, newChannel]);

  const onSubscribe = () => {
    setSub(!sub);
    if (sub && subscribed) {
      unsubscribeChannel(singleChannel._id);
      console.log(newChannel);
      // alert(subMsg.msg);
    } else {
      subscribeChannel(singleChannel._id);
      console.log(newChannel);
      // alert(subMsg.msg);
    }
  };

  const onDelete = () => {
    if (singleChannel) {
      deleteChannel(singleChannel._id);
      navigate('/dashboard');
    }
  };
  return (
    <main className='channels'>
      <div className='container'>
        {' '}
        <h3 class='h3'>
          <span class='primary'>{singleChannel && singleChannel.title}</span>{' '}
          Channel
        </h3>
        <div class='single-channel'>
          {singleChannel === null ? (
            <h2>Loading</h2>
          ) : (
            <>
              <div class='cover-image'>
                <img
                  src={
                    singleChannel.cover
                      ? `http://localhost:5000/${singleChannel.cover}`
                      : '/img/no-cover.png'
                  }
                  alt=''
                />
              </div>
              <div class='image-channel'>
                <img
                  src={
                    singleChannel.image
                      ? `http://localhost:5000/${singleChannel.image}`
                      : '/img/no-image.png'
                  }
                  alt=''
                />
                <div>
                  {isAuthenticated &&
                  user &&
                  singleChannel.user._id === user._id ? (
                    <>
                      <button onClick={onDelete}>
                        <i class='fa-solid fa-trash-can'></i>
                      </button>
                      <button onClick={() => navigate('/channel/edit')}>
                        <i class='fa-solid fa-pen-to-square'></i>
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  <button
                    onClick={onSubscribe}
                    className={subscribed ? 'disabled' : ''}
                  >
                    Subscribe
                  </button>
                  <i class='fa-solid fa-bell active'></i>
                </div>
              </div>
              <nav class='channel-nav'>
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
                <div class='info'>
                  <h3 class='h2 name'>
                    {singleChannel.title}{' '}
                    <i class='fa-solid fa-check check small'></i>
                  </h3>
                  <h3 class='subs'>
                    {singleChannel.subscribers.length} Subscribers
                  </h3>
                  <div class='bio'>
                    <h4>Bio</h4>
                    <span>{singleChannel.description}</span>
                  </div>

                  <div>
                    <h4>Channel Created At</h4>
                    <span class='createdAt'>
                      {' '}
                      {singleChannel.createdAt &&
                        new Date(singleChannel.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <DashboardVids
                  name='channel'
                  channelID={singleChannel._id}
                  isAdmin={false}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
export default SingleChannel;
