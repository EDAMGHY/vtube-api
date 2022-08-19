import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import SelectHome from '../components/SelectHome';
import { useSearchGlobalContext } from '../actions/search';
import { useVideoGlobalContext } from '../actions/video';
import {
  secondsToTime,
  timeSince,
  shortenText,
  intToString,
} from '../utils/utilities';
import { useAuthGlobalContext } from '../actions/auth';

const Home = () => {
  const navigate = useNavigate();
  const { videos, getSearchedVideos, loading } = useSearchGlobalContext();
  const { deleteVideo } = useVideoGlobalContext();
  const { user, isAuthenticated, userChannel } = useAuthGlobalContext();
  useEffect(() => {
    getSearchedVideos();
  }, [getSearchedVideos]);
  const onDelete = (vid) => {
    deleteVideo(vid);
    navigate('/dashboard');
  };
  return (
    <Section nameClass='main'>
      {/* <SelectHome /> */}
      <div className='all-videos'>
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <Link
              to={`/videos/${video.channel.title
                .toLowerCase()
                .split(' ')
                .join('-')}/${video._id}`}
            >
              <div className='video'>
                {isAuthenticated &&
                userChannel &&
                userChannel._id === video.channel._id ? (
                  <div className='video-auth'>
                    <Link to={`/video/edit/${video._id}`}>
                      <i className='fa-solid fa-pen-to-square edit-pen'></i>
                    </Link>
                    <i
                      onClick={() => onDelete(video._id)}
                      className='fa-solid fa-trash-can edit-pen edit-pen'
                    ></i>
                  </div>
                ) : (
                  ''
                )}

                <div className='vid-thumb'>
                  <img
                    src={`http://localhost:5000/${video.thumbnail}`}
                    alt=''
                  />
                  <span>{secondsToTime(video.duration)}</span>
                </div>
                <div className='vid-info'>
                  <div className='channel-thumb'>
                    <img
                      src={
                        video.channel.image
                          ? `http://localhost:5000/${video.channel.image}`
                          : '/img/no-image.png'
                      }
                      alt=''
                    />
                  </div>
                  <div className='video-data'>
                    <h5>{shortenText(video.title)}</h5>
                    <span className='channel-name'>
                      {video.channel.title}{' '}
                      <i className='fa-solid fa-check check'></i>
                    </span>
                    <div>
                      <span className='views'>
                        {intToString(video.views)} views
                      </span>
                      <span className='vid-published'>
                        {timeSince(video.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 className='text-center'>Loading...</h1>
        )}
      </div>
    </Section>
  );
};

export default Home;
