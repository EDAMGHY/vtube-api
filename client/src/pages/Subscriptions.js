import React, { useEffect } from 'react';
import Section from '../components/Section';
import { useProfileGlobalContext } from '../actions/profile';
const Subscriptions = () => {
  const { getSubscriptions, subscriptions, loading } =
    useProfileGlobalContext();
  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);
  return (
    <Section nameClass='subscriptions'>
      <h3 class='h3'>Subscriptions</h3>
      {subscriptions.length === 0 ? (
        <h2>No Subscriptions...</h2>
      ) : (
        <div className='sub-channels'>
          {subscriptions.map((sub) => (
            <div key={sub.channel} className='sub-channel'>
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
                <span className='subscribers'>
                  {sub.subscribers} subscribers
                </span>
                <button className='button'>Subscribe</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};
export default Subscriptions;
