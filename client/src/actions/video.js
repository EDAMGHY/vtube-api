import React, { useContext, useReducer, useEffect } from 'react';
import videoReducer from '../reducers/video';
import axios from 'axios';
const VideoContext = React.createContext();

const initialState = {
  video: null,
  singleVideo: null,
  current: null,
  videos: [],
  likes: [],
  unlikes: [],
  comments: [],
  videos: [],
  channelVideos: [],
  loading: true,

  msg: {},
  error: {},
};
const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const createVideo = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        `http://localhost:5000/api/v1/video/`,
        formData,
        config
      );
      console.log(formData);
      console.log(res.data);
      dispatch({
        type: 'CREATE_VIDEO',
        payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Video Updated!' : 'Video Created!', 'success'));
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      console.log(err);
      // const errors = err.response.data.errors;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const editVideo = async (formData, videoID) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.put(
        `http://localhost:5000/api/v1/video/${videoID}/edit`,
        formData,
        config
      );
      console.log(formData);
      console.log(res.data);
      dispatch({
        type: 'UPDATE_VIDEO',
        payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Video Updated!' : 'Video Created!', 'success'));
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      console.log(err);
      // const errors = err.response.data.errors;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const deleteVideo = async (videoID) => {
    try {
      const res = axios.delete(`http://localhost:5000/api/v1/video/${videoID}`);
      console.log(res.data);
      dispatch({
        type: 'DELETE_VIDEO',
        payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Video Updated!' : 'Video Created!', 'success'));
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      console.log(err.response.data);
      // const errors = err.response.data.errors;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };

  const getVideoByID = async (videoID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/video/${videoID}`
      );

      dispatch({
        type: 'GET_VIDEO',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const getChannelVideos = async (channelId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/video/${channelId}/videos`
      );

      dispatch({
        type: 'GET_CHANNEL_VIDEOS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const likeVideo = async (videoID, currentUser) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/video/like/${videoID}`
      );

      dispatch({
        type: 'LIKE_VIDEO',
        payload: { id: videoID, likes: res.data, user: currentUser },
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const unlikeVideo = async (videoID, currentUser) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/video/unlike/${videoID}`
      );

      dispatch({
        type: 'UNLIKE_VIDEO',
        payload: { id: videoID, unlikes: res.data, user: currentUser },
      });
      console.log('unlikes', res.data);
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const commentVideo = async (videoID, text) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ text });
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/video/comment/${videoID}`,
        body,
        config
      );

      dispatch({
        type: 'COMMENT_VIDEO',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const deleteComment = async (videoID, commentID) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/video/comment/${videoID}/${commentID}`
      );

      dispatch({
        type: 'DELETE_COMMENT',
        payload: commentID,
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };

  const unSubV = () => {
    dispatch({ type: 'UNSUB' });
  };
  const subV = () => {
    dispatch({ type: 'SUB' });
  };
  const unNotV = () => {
    dispatch({ type: 'UNNOT' });
  };
  const notV = () => {
    dispatch({ type: 'NOT' });
  };

  return (
    <VideoContext.Provider
      value={{
        ...state,
        createVideo,
        getVideoByID,
        commentVideo,
        unlikeVideo,
        deleteComment,
        editVideo,
        likeVideo,
        getChannelVideos,
        deleteVideo,
        unSubV,
        subV,
        notV,
        unNotV,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

// custom hook
export const useVideoGlobalContext = () => {
  return useContext(VideoContext);
};
export { VideoContext, VideoProvider };
