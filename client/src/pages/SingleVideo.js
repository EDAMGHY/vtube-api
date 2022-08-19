import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVideoGlobalContext } from '../actions/video';
import { useAuthGlobalContext } from '../actions/auth';
import { useChannelGlobalContext } from '../actions/channel';
import Section from '../components/Section';
import VideoComponent from '../components/SingleVideo/Video';
import VideoInfo from '../components/SingleVideo/Video/VideoInfo';
import SameCategoryVids from '../components/SingleVideo/SameCategoryVids';

const SingleVideo = () => {
  const { singleVideo, getVideoByID } = useVideoGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    getVideoByID(id);
  }, [id]);

  return (
    <Section nameClass='video-page'>
      {singleVideo === null ? (
        <h1>Loading....</h1>
      ) : (
        <div className='v-container'>
          <div className='video-player'>
            <VideoComponent singleVideo={singleVideo} />
            <VideoInfo singleVideo={singleVideo} />
          </div>
          <SameCategoryVids singleVideo={singleVideo} />
        </div>
      )}
    </Section>
  );
};
export default SingleVideo;
