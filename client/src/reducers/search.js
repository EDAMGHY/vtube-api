function searchReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_VIDEOS':
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case 'SEARCH_RESULT':
      return {
        ...state,
        searched: payload,
        loading: false,
      };
    case 'SET_TERM':
      return {
        ...state,
        search: payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: payload,
      };
    case 'SET_CAT':
      return {
        ...state,
        cat: payload,
      };
    case 'VIDEO_ERROR':
    case 'SEARCH_ERROR':
      return {
        ...state,
        error: payload,
        loading: false,
        videos: [],
      };

    default:
      return state;
  }
}
export default searchReducer;
