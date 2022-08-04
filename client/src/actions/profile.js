import React, { useContext, useReducer, useEffect } from 'react';
import profileReducer from '../reducers/profile';
import axios from 'axios';
const ProfileContext = React.createContext();

const initialState = {
  profile: null,
  singleProfile: null,
  profiles: [],
  subscriptions: [],
  notifications: [],
  loading: true,
  error: {},
};
const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const createProfile = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        'http://localhost:5000/api/v1/profile',
        formData,
        config
      );
      console.log(formData);
      console.log(res.data);
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Profile Updated!' : 'Profile Created!', 'success'));
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      console.log(err.message);
      // const errors = err.response.data.errors;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const getProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/profile');

      dispatch({
        type: 'GET_PROFILES',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const getSubscriptions = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/profile/subscriptions'
      );

      dispatch({
        type: 'GET_SUBSCRIPTIONS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_SUBSCRIPTIONS_FAIL',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const getNotifications = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/profile/notifications'
      );

      dispatch({
        type: 'GET_NOTIFICATIONS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_NOTIFICATIONS_FAIL',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const getProfileByID = async (profileID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/profile/user/${profileID}`
      );

      dispatch({
        type: 'GET_SINGLE_PROFILE',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const clearProfile = async () => {
    dispatch({ type: 'CLEAR_PROFILE' });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        createProfile,
        getProfiles,
        getProfileByID,
        getSubscriptions,
        clearProfile,
        getNotifications,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// custom hook
export const useProfileGlobalContext = () => {
  return useContext(ProfileContext);
};
export { ProfileContext, ProfileProvider };
