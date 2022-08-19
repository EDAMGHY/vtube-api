import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../../utils/utilities';

const SubscribeCard = ({ item }) => {
  return (
    <Link to={`/channels/${item.channel.user}`}>
      <li
        style={{
          gridTemplateColumns: '0.25fr 1.75fr',
        }}
      >
        <div className='channel-img'>
          <img
            src={
              item.channel.image
                ? `http://localhost:5000/${item.channel.image}`
                : './img/no-image.png'
            }
            alt={item.channel.title}
          />
        </div>
        <div className='noti-info'>
          <p>
            {' '}
            <strong style={{ fontWeight: 700 }}>{item.user.name}</strong>
            &nbsp; has subscribed to &lt; {item.channel.title} &gt;
          </p>
          <span> {timeSince(item.createdAt)} </span>
        </div>
      </li>
    </Link>
  );
};

export default SubscribeCard;
