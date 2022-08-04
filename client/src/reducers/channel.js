function channelReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CHANNEL':
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    case 'GET_SINGLE_CHANNEL':
      return {
        ...state,
        singleChannel: payload,
        loading: false,
      };
    case 'SUBSCRIBE_CHANNEL':
      return {
        ...state,
        newChannel: payload,
        loading: false,
      };
    case 'UNSUBSCRIBE_CHANNEL':
      return {
        ...state,
        newChannel: payload,
        loading: false,
      };
    case 'NOTIFY_CHANNEL':
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    case 'UNNOTIFY_CHANNEL':
      return {
        ...state,
        msg: payload,
        loading: false,
      };

    case 'GET_CHANNELS':
      return {
        ...state,
        channels: payload,
        loading: false,
      };
    case 'CHANNEL_ERROR':
    case 'GET_SUBSCRIPTIONS_FAIL':
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case 'CLEAR_CHANNEL':
    case 'CHANNEL_DELETED':
      return {
        ...state,
        channel: null,
        loading: false,
      };
    default:
      return state;
  }
}
export default channelReducer;
