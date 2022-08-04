function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case 'CHANNEL_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        userChannel: payload,
      };
    case 'PROFILE_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        userProfile: payload,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('tokenvtube', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':
    case 'ACCOUNT_DELETED':
      localStorage.removeItem('tokenvtube');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
export default authReducer;
