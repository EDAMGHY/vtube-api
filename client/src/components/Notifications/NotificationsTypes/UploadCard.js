import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../../utils/utilities';

const UploadCard = ({ item }) => {
  return (
    <Link to={`videos/${item.channel.title}/${item.video._id}`}>
      <li
        style={{
          gridTemplateColumns: '0.5fr 2.5fr 1fr',
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
            {item.channel.title} just upload a video titled {item.video.title}.
          </p>
          <span> {timeSince(item.createdAt)} </span>
        </div>
        <div className='video-img'>
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
};

export default UploadCard;
