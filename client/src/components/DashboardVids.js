import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useVideoGlobalContext } from '../actions/video';
import {
  secondsToTime,
  timeSince,
  intToString,
  shortenText,
} from '../utils/utilities';
const DashboardVids = ({ name, channelID, isAdmin = true }) => {
  const { channelVideos, getChannelVideos, loading, deleteVideo } =
    useVideoGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    getChannelVideos(channelID);
  }, [getChannelVideos]);

  if (channelVideos.length === 0) {
    return (
      <div class='no-videos'>
        <div class='image'>
          <img src='/img/bg-play-yellow.svg' alt='' />
        </div>
        <h3 class='text-center'>This Channel has no videos!</h3>
        {isAdmin && (
          <Link to={`/video`} class='btn'>
            Upload Video
          </Link>
        )}
      </div>
    );
  }

  const onDelete = (vid) => {
    deleteVideo(vid);
    navigate('/dashboard');
  };
  return (
    <div className={`${name}-vids`}>
      {loading && <h2>Loading</h2>}
      {channelVideos.map((vid) => (
        <Link
          to={`/videos/${vid.channel.title
            .toLowerCase()
            .split(' ')
            .join('-')}/${vid._id}`}
        >
          <div class='vid'>
            <div className='vid-auth'>
              {isAdmin && (
                <>
                  <Link to={`/video/edit/${vid._id}`}>
                    <i className='fa-solid fa-pen-to-square edit-pen'></i>
                  </Link>
                  <i
                    onClick={() => onDelete(vid._id)}
                    className='fa-solid fa-trash-can edit-pen edit-pen'
                  ></i>
                </>
              )}
            </div>
            <div class='image-container'>
              <img
                src={
                  vid.thumbnail
                    ? `http://localhost:5000/${vid.thumbnail}`
                    : '/img/no-image.png'
                }
                alt=''
              />
              <span class='time'> {secondsToTime(vid.duration)} </span>
            </div>
            <div class='info-vid'>
              <h4>{shortenText(vid.title)}</h4>
              <div>
                <span class='views'>{intToString(vid.views)} views</span>
                <span class='date'>{timeSince(vid.createdAt)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default DashboardVids;
