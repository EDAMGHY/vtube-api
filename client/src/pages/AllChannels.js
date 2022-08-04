import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChannelGlobalContext } from '../actions/channel';
import ChannelCard from '../components/ChannelCard';
const AllChannels = () => {
  const { getChannels, channels, loading } = useChannelGlobalContext();
  useEffect(() => {
    getChannels();
  }, [getChannels]);
  return (
    <main className='channels'>
      <div className='container'>
        <h3 className='h3'>Channels</h3>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className='channels-card'>
            {channels.map((channel, index) => (
              <ChannelCard channel={channel} key={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default AllChannels;
