import React, { useEffect } from 'react';
import Section from '../components/Section';
import { useProfileGlobalContext } from '../actions/profile';
import ChannelSub from '../components/ChannelSub';
const Subscriptions = () => {
  const { getSubscriptions, subscriptions, loading } =
    useProfileGlobalContext();
  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);
  return (
    <Section nameClass='subscriptions'>
      <h3 className='h3'>Subscriptions</h3>
      {subscriptions.length === 0 ? (
        <h2>No Subscriptions...</h2>
      ) : (
        <div className='sub-channels'>
          {subscriptions.map((sub) => (
            <ChannelSub key={sub.channel} sub={sub}></ChannelSub>
          ))}
        </div>
      )}
    </Section>
  );
};
export default Subscriptions;
