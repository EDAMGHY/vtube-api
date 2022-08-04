function profileReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case 'GET_SINGLE_PROFILE':
      return {
        ...state,
        singleProfile: payload,
        loading: false,
      };
    case 'GET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: payload,
        loading: false,
      };
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notifications: payload,
        loading: false,
      };
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case 'PROFILE_ERROR':
    case 'GET_SUBSCRIPTIONS_FAIL':
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null,
        subscriptions: [],
        loading: false,
      };
    default:
      return state;
  }
}
export default profileReducer;
