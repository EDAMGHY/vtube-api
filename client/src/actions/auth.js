import React, { useContext, useReducer, useEffect } from 'react';
import authReducer from '../reducers/auth';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const AuthContext = React.createContext();

const initialState = {
  token: localStorage.getItem('tokenvtube'),
  user: null,
  userProfile: null,
  userChannel: null,
  isAuthenticated: null,
  loading: true,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const register = async ({ name, email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      console.log(body);
      const res = await axios.post(
        'http://localhost:5000/api/v1/users',
        body,
        config
      );
      console.log(res.data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        //    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        errors.forEach((error) => {
          console.log(error.msg);
          window.alert(error.msg);
        });
      }
      console.log(err.message);
      dispatch({ type: 'REGISTER_FAIL' });
    }
  };
  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      console.log(body);
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth',
        body,
        config
      );
      console.log(res.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      dispatch(loadUser());
      dispatch(loadProfile());
      dispatch(loadChannel());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        //    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        errors.forEach((error) => {
          console.log(error.msg);
          window.alert(error.msg);
        });
      }
      console.log(err.message);
      dispatch({ type: 'LOGIN_FAIL' });
    }
  };

  const loadUser = async () => {
    if (localStorage.tokenvtube) {
      setAuthToken(localStorage.tokenvtube);
    }

    try {
      const res = await axios.get('http://localhost:5000/api/v1/auth');
      console.log(res, res);
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      console.log(err.message);
      //   dispatch({ type: 'AUTH_ERROR' });
    }
  };
  const loadProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/profile/me');
      console.log('profile', res.data);
      dispatch({ type: 'PROFILE_LOADED', payload: res.data });
    } catch (err) {
      console.log(err.message);
      //   dispatch({ type: 'AUTH_ERROR' });
    }
  };
  const loadChannel = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/channel/mychannel'
      );
      console.log('channel', res.data);
      dispatch({ type: 'CHANNEL_LOADED', payload: res.data });
    } catch (err) {
      console.log(err.message);
      //   dispatch({ type: 'AUTH_ERROR' });
    }
  };
  const logout = async () => {
    dispatch({ type: 'CLEAR_PROFILE' });
    dispatch({ type: 'LOGOUT' });
  };

  const deleteAccount = async () => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/profile`);
        // dispatch({ type: 'CLEAR_PROFILE' });
        dispatch({ type: 'ACCOUNT_DELETED' });
        // dispatch(setAlert('Your account has been permanently deleted!'));
      } catch (err) {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        register,
        login,
        loadUser,
        loadProfile,
        logout,
        deleteAccount,
        loadChannel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuthGlobalContext = () => {
  return useContext(AuthContext);
};
export { AuthContext, AuthProvider };
