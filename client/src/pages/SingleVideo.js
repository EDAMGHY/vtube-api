import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVideoGlobalContext } from '../actions/video';
import { useAuthGlobalContext } from '../actions/auth';
import { useChannelGlobalContext } from '../actions/channel';
import { timeSince, intToString } from '../utils/utilities';
import Section from '../components/Section';

const SingleVideo = () => {
  const {
    singleVideo,
    loading,
    getVideoByID,
    commentVideo,
    likeVideo,
    unlikeVideo,
    deleteComment,
    deleteVideo,
    unSubV,
    subV,
    unNotV,
    notV,
  } = useVideoGlobalContext();
  const { user, isAuthenticated, userChannel, token } = useAuthGlobalContext();

  const { id } = useParams();
  const {
    msg,
    newChannel,
    subscribeChannel,
    unsubscribeChannel,

    notifyChannel,
    unnotifyChannel,
  } = useChannelGlobalContext();

  const [text, setText] = useState('');
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislike, setDislike] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    getVideoByID(id);
  }, [id]);

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
  const commentAVideo = (e) => {
    e.preventDefault();
    if (text) {
      commentVideo(singleVideo._id, text);
      setText('');
    } else {
      window.alert('Please add Comment...');
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
  const onDelete = (vid) => {
    deleteVideo(vid);
    navigate('/');
  };
  return (
    <Section nameClass='video-page'>
      {singleVideo === null ? (
        <h1>Loading....</h1>
      ) : (
        <div class='v-container'>
          <div class='video-player'>
            <div class='vid-container'>
              <video
                src={`http://localhost:5000/${singleVideo.videoPath}`}
                controls
              ></video>
              {isAuthenticated &&
              userChannel &&
              userChannel._id === singleVideo.channel._id ? (
                <div>
                  <Link to={`/video/edit/${singleVideo._id}`}>
                    <button>
                      <i class='fa-solid fa-pen-to-square'></i>
                    </button>
                  </Link>
                  <button onClick={() => onDelete(singleVideo._id)}>
                    <i class='fa-solid fa-trash-can'></i>
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
            <div class='vid-info'>
              <div class='tags mb-2 primary'>
                {singleVideo.tags.map((tag) => (
                  <span>#{tag} </span>
                ))}
              </div>
              <h3>
                {singleVideo.title}{' '}
                <span class='badge-cate'>{singleVideo.category}</span>
              </h3>
              <div class='views-date'>
                <span class='views'>
                  {intToString(singleVideo.views)} views
                </span>
                <span class='date'>
                  {moment(singleVideo.createdAt).format('MMM Do YYYY')}
                </span>
              </div>
              <div class='desc'>{singleVideo.description}</div>
              <div class='channel-card'>
                <div class='channel-info'>
                  <img
                    src={
                      singleVideo.channel.image
                        ? `http://localhost:5000/${singleVideo.channel.image}`
                        : '/img/no-image.png'
                    }
                    alt=''
                  />
                  <div class='name-subs'>
                    <h4>{singleVideo.channel.title}</h4>
                    <span class='subs'>
                      {singleVideo.channel.subscribers.length} Subscribers
                    </span>
                  </div>
                </div>
                <div class='btns'>
                  <button onClick={likeAVideo} class='thumbs'>
                    <i
                      class={`fa-solid fa-thumbs-up ${liked ? 'primary' : ''}`}
                    ></i>
                  </button>
                  <span>{singleVideo.likes.length}</span>
                  <button onClick={dislikeAVideo} class='thumbs'>
                    <i
                      class={`fa-solid fa-thumbs-down ${
                        disliked ? 'primary' : ''
                      }`}
                    ></i>
                  </button>
                  <span>{singleVideo.unlikes.length}</span>
                  <button
                    onClick={onSubscribe}
                    className={`sub ${
                      singleVideo.subscribed ? 'disabled' : ''
                    }`}
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
              <div class='comments'>
                <h4>{singleVideo.comments.length} Comments</h4>
                <form class='form' onSubmit={commentAVideo}>
                  <div class='form-control'>
                    <input
                      type='text'
                      name='text'
                      placeholder='Add a comment...'
                      class='input'
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <button class='btn'>Add</button>
                </form>
                <div class='comment-container'>
                  {singleVideo.comments.length > 0 ? (
                    singleVideo.comments.map((comment) => (
                      <div class='comment'>
                        <img
                          src={
                            comment.userImage
                              ? `http://localhost:5000/${comment.userImage}`
                              : '/img/no-image.png'
                          }
                          alt=''
                        />
                        {isAuthenticated && user._id === comment.user ? (
                          <button
                            onClick={() =>
                              deleteComment(singleVideo._id, comment._id)
                            }
                            class='delete'
                          >
                            <i class='fa-solid fa-trash-can'></i>
                          </button>
                        ) : (
                          ''
                        )}

                        <div class='info'>
                          <div>
                            <h5>{comment.userName}</h5>
                            <span>{timeSince(comment.date)}</span>
                          </div>
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3 className='text-center'>No Comments</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class='category-videos'>
            <h3>
              More Videos in <span class='primary'>{singleVideo.category}</span>
            </h3>

            <div class='category-vids'>
              {singleVideo.categoryVids.length > 0 ? (
                singleVideo.categoryVids.map((video) => (
                  <div class='cat-vid'>
                    <img
                      src={
                        video.thumb
                          ? `http://localhost:5000/${video.thumb}`
                          : '/img/no-image.png'
                      }
                      alt=''
                    />
                    <div class='info'>
                      <h4>{video.videoTitle}</h4>
                      <span>
                        {video.channelTitle} <i class='fa-solid fa-check'></i>{' '}
                      </span>
                      <div>
                        <span class='views'>
                          {intToString(video.views)} views
                        </span>
                        <span class='time'>{timeSince(video.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h4 className='text-center'>
                  No Videos for {singleVideo.category}...
                </h4>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
export default SingleVideo;
