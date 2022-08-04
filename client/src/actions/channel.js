import React, { useContext, useReducer, useEffect } from 'react';
import channelReducer from '../reducers/channel';
import axios from 'axios';
const ChannelContext = React.createContext();

const initialState = {
  channel: null,
  singleChannel: null,
  msg: null,
  channels: [],
  newChannel: {},
  loading: true,
  error: {},
};
const ChannelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(channelReducer, initialState);
  const createChannel = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        'http://localhost:5000/api/v1/channel',
        formData,
        config
      );
      console.log(formData);
      console.log(res.data);
      dispatch({
        type: 'GET_CHANNEL',
        payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Channel Updated!' : 'Channel Created!', 'success'));
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: {
          msg: err,
          message: err.message,
          status: err.response.status,
          messages: err.response.data.errors,
        },
      });
      console.log(err.message);
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) => window.alert(error.msg));
      // }
    }
  };
  const getChannels = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/channel');

      dispatch({
        type: 'GET_CHANNELS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };

  const getChannelByID = async (channelID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/channel/user/${channelID}`
      );

      dispatch({
        type: 'GET_SINGLE_CHANNEL',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const subscribeChannel = async (channelID) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/channel/subscribe/${channelID}`
      );

      console.log('sub', res.data);
      dispatch({
        type: 'SUBSCRIBE_CHANNEL',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const unsubscribeChannel = async (channelID) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/channel/unsubscribe/${channelID}`
      );
      console.log('unsub', res.data);
      dispatch({
        type: 'UNSUBSCRIBE_CHANNEL',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const notifyChannel = async (channelID) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/channel/notify/${channelID}`
      );

      console.log('notify', res.data);
      dispatch({
        type: 'NOTIFY_CHANNEL',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const unnotifyChannel = async (channelID) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/channel/unnotify/${channelID}`
      );
      console.log('unnotify', res.data);
      dispatch({
        type: 'UNNOTIFY_CHANNEL',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHANNEL_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };

  const deleteChannel = async (id) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/channel/${id}`);
        // dispatch({ type: 'CLEAR_PROFILE' });
        dispatch({ type: 'CHANNEL_DELETED' });
        // dispatch(setAlert('Your account has been permanently deleted!'));
      } catch (err) {
        dispatch({
          type: 'CHANNEL_ERROR',
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
  const clearChannel = async () => {
    dispatch({ type: 'CLEAR_CHANNEL' });
  };

  return (
    <ChannelContext.Provider
      value={{
        ...state,
        createChannel,
        getChannels,
        getChannelByID,
        clearChannel,
        unsubscribeChannel,
        subscribeChannel,
        notifyChannel,
        unnotifyChannel,
        deleteChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

// custom hook
export const useChannelGlobalContext = () => {
  return useContext(ChannelContext);
};
export { ChannelContext, ChannelProvider };
