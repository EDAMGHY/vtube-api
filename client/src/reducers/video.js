function videoReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_VIDEO':
      return {
        ...state,
        singleVideo: payload,
        current: payload,
        loading: false,
      };
    case 'CREATE_VIDEO':
      return {
        ...state,
        msg: 'Video Created',
        video: payload,
        loading: false,
      };
    case 'UPDATE_VIDEO':
      return {
        ...state,
        msg: 'Video Updated',
        video: payload,
        loading: false,
      };
    case 'DELETE_VIDEO':
      return {
        ...state,
        msg: payload,
        loading: false,
      };

    case 'GET_CHANNEL_VIDEOS':
      return {
        ...state,
        channelVideos: payload,
        loading: false,
      };
    case 'LIKE_VIDEO':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          unlikes: state.singleVideo.unlikes.filter(
            (unlike) => unlike.user !== payload.user
          ),
          likes: payload.likes,
        },
        loading: false,
      };
    case 'UNLIKE_VIDEO':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          likes: state.singleVideo.likes.filter(
            (like) => like.user !== payload.user
          ),
          unlikes: payload.unlikes,
        },
        loading: false,
      };
    case 'SUB':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          subscribed: true,
        },
        loading: false,
      };
    case 'UNSUB':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          subscribed: false,
        },
        loading: false,
      };
    case 'NOT':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          notified: true,
        },
        loading: false,
      };
    case 'UNNOT':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          notified: false,
        },
        loading: false,
      };

    case 'COMMENT_VIDEO':
      return {
        ...state,
        singleVideo: { ...state.singleVideo, comments: [...payload] },
        loading: false,
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        singleVideo: {
          ...state.singleVideo,
          comments: state.singleVideo.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };

    case 'VIDEO_ERROR':
      return {
        ...state,
        error: payload,
        singleVideo: null,
        loading: false,
      };

    default:
      return state;
  }
}
export default videoReducer;
