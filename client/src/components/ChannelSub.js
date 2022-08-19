import React from 'react';

const ChannelSub = ({ sub }) => {
  return (
    <div className='sub-channel'>
      <img
        src={
          sub.channelImage
            ? `http://localhost:5000/${sub.channelImage}`
            : '/img/no-image.png'
        }
        alt=''
      />
      <div className='info'>
        <h4 className='name'>{sub.channelName}</h4>
        <span className='subscribers'>{sub.subscribers} subscribers</span>
      </div>
    </div>
  );
};

export default ChannelSub;
