import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useChannelGlobalContext } from '../actions/channel';
const ChannelCard = ({ channel }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [sub, setSub] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    msg,
    loading,
    newChannel,
    subscribeChannel,
    unsubscribeChannel,
    deleteChannel,
  } = useChannelGlobalContext();
  const { user, isAuthenticated } = useAuthGlobalContext();

  useEffect(() => {
    if (user) {
      const isSubscribed = channel.subscribers.some(
        (cha) => cha.user == user._id
      );
      setSub(subscribed);
      setSubscribed(isSubscribed);
    }
  }, [channel, subscribeChannel, unsubscribeChannel, newChannel]);

  const onClick = () => {
    setSub(!sub);
    if (sub && subscribed) {
      unsubscribeChannel(channel._id);
      console.log(newChannel);
      // alert(subMsg.msg);
    } else {
      subscribeChannel(channel._id);
      console.log(newChannel);
      // alert(subMsg.msg);
    }
  };

  const removeChannel = () => {
    deleteChannel(channel._id);
    // navigate('/dashboard');
  };

  return (
    <div className='channel-card'>
      {isAuthenticated && channel && channel.user._id === user && user._id ? (
        <div className='current-user'>
          <Link to='/channel/edit'>
            <i className='fa-solid fa-pen-to-square'></i>
          </Link>
          <button onClick={removeChannel}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
        </div>
      ) : (
        ''
      )}

      <div className='channel-cover'>
        <img
          src={
            channel && channel.cover
              ? `http://localhost:5000/${channel.cover}`
              : '/img/no-cover.png'
          }
          alt=''
        />
      </div>
      <div className='channel-image'>
        <img
          src={
            channel && channel.image
              ? `http://localhost:5000/${channel.image}`
              : '/img/no-image.png'
          }
          alt=''
        />
        <div>
          <button onClick={onClick} className={subscribed ? 'disabled' : ''}>
            Subscribe
          </button>
        </div>
      </div>
      <div className='info'>
        <h4 className='name'>{channel.title}</h4>
        <span className='createdAt'>
          {' '}
          {channel.subscribers.length} : subscribers
        </span>
        <p className='bio'>{channel.description}</p>
        <Link to={`/channels/${channel && channel.user._id}`} className='btn-2'>
          View Channel
        </Link>
      </div>
    </div>
  );
};
export default ChannelCard;
