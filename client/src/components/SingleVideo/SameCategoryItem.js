import React from 'react';
import { Link } from 'react-router-dom';
import { intToString, timeSince } from '../../utils/utilities';

const SameCategoryItem = ({ video }) => {
  return (
    <Link to={`/videos/${video.channelTitle}/${video.video}`}>
      <div className='cat-vid'>
        <img
          src={
            video.thumb
              ? `http://localhost:5000/${video.thumb}`
              : '/img/no-image.png'
          }
          alt=''
        />
        <div className='info'>
          <h4>{video.videoTitle}</h4>
          <span>
            {video.channelTitle} <i className='fa-solid fa-check'></i>{' '}
          </span>
          <div>
            <span className='views'>{intToString(video.views)} views</span>
            <span className='time'>{timeSince(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SameCategoryItem;
