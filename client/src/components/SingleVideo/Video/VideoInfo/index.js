import React, { useEffect, useState } from 'react';
import { useAuthGlobalContext } from '../../../../actions/auth';
import { useChannelGlobalContext } from '../../../../actions/channel';
import { useVideoGlobalContext } from '../../../../actions/video';
import Comments from '../../../Comments';
import moment from 'moment';
import { intToString } from '../../../../utils/utilities';

const VideoInfo = ({ singleVideo }) => {
  const { likeVideo, unlikeVideo, unSubV, subV, unNotV, notV } =
    useVideoGlobalContext();
  const { user } = useAuthGlobalContext();

  const {
    newChannel,
    subscribeChannel,
    unsubscribeChannel,

    notifyChannel,
    unnotifyChannel,
  } = useChannelGlobalContext();

  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislike, setDislike] = useState(false);

  useEffect(() => {
    if (singleVideo) {
      const isLiked = singleVideo.likes.some((like) => like.user == user._id);
      setLike(liked);
      setLiked(isLiked);
    }
  }, [singleVideo, likeVideo, unlikeVideo, newChannel]);

  useEffect(() => {
    if (singleVideo) {
      const isLiked = singleVideo.unlikes.some((like) => like.user == user._id);
      setDislike(liked);
      setDisliked(isLiked);
    }
  }, [singleVideo, likeVideo, unlikeVideo, newChannel]);

  const onSubscribe = () => {
    if (singleVideo.subscribed) {
      unSubV();
      unsubscribeChannel(singleVideo.channel._id);
      alert(`Channel ${singleVideo.channel.title} unsubscribed...`);
    } else {
      subV();
      subscribeChannel(singleVideo.channel._id);
      alert(`Channel ${singleVideo.channel.title} subscribed...`);
    }
  };
  const onNotify = () => {
    if (singleVideo.notified) {
      unNotV();
      unnotifyChannel(singleVideo.channel._id);
      alert(
        `You'll not get notifications from  ${singleVideo.channel.title}...`
      );
    } else {
      notV();
      notifyChannel(singleVideo.channel._id);
      alert(`You'll get notifications from  ${singleVideo.channel.title}...`);
    }
  };

  const likeAVideo = () => {
    setLike(!liked);
    if (like && liked) {
      alert('You already like this');
    } else {
      likeVideo(singleVideo._id, user._id.toString());
    }
  };
  const dislikeAVideo = () => {
    setDislike(!disliked);
    if (dislike && disliked) {
      alert('You already unlike this');
    } else {
      unlikeVideo(singleVideo._id, user._id.toString());
    }
  };

  return (
    <div className='vid-info'>
      <div className='tags mb-2 primary'>
        {singleVideo.tags.map((tag) => (
          <span>#{tag} </span>
        ))}
      </div>
      <h3>
        {singleVideo.title}{' '}
        <span className='badge-cate'>{singleVideo.category}</span>
      </h3>
      <div className='views-date'>
        <span className='views'>{intToString(singleVideo.views)} views</span>
        <span className='date'>
          {moment(singleVideo.createdAt).format('MMM Do YYYY')}
        </span>
      </div>
      <div className='desc'>{singleVideo.description}</div>
      <div className='channel-card'>
        <div className='channel-info'>
          <img
            src={
              singleVideo.channel.image
                ? `http://localhost:5000/${singleVideo.channel.image}`
                : '/img/no-image.png'
            }
            alt=''
          />
          <div className='name-subs'>
            <h4>{singleVideo.channel.title}</h4>
            <span className='subs'>
              {singleVideo.channel.subscribers.length} Subscribers
            </span>
          </div>
        </div>
        <div className='btns'>
          <button onClick={likeAVideo} className='thumbs'>
            <i
              className={`fa-solid fa-thumbs-up ${liked ? 'primary' : ''}`}
            ></i>
          </button>
          <span>{singleVideo.likes.length}</span>
          <button onClick={dislikeAVideo} className='thumbs'>
            <i
              className={`fa-solid fa-thumbs-down ${disliked ? 'primary' : ''}`}
            ></i>
          </button>
          <span>{singleVideo.unlikes.length}</span>
          <button
            onClick={onSubscribe}
            className={`sub ${singleVideo.subscribed ? 'disabled' : ''}`}
          >
            Subscribe
          </button>
          <i
            onClick={onNotify}
            className={`fa-solid fa-bell ${
              singleVideo.notified ? 'active' : ''
            } `}
          ></i>
        </div>
      </div>
      <Comments singleVideo={singleVideo} />
    </div>
  );
};

export default VideoInfo;
