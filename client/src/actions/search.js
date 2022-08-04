import React, { useContext, useReducer, useEffect } from 'react';
import searchReducer from '../reducers/search';
import axios from 'axios';
const SearchContext = React.createContext();

const initialState = {
  video: null,
  search: '',
  sort: 'a-z',
  searched: [],
  cat: 'all',
  loading: true,
  error: {},
};
const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const getSearchedVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/search');

      dispatch({
        type: 'GET_VIDEOS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'VIDEO_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const searchResult = async (term, cat, sort) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/search?term=${term}&cat=${cat}&sort=${sort}`
      );
      console.log('searchResult', res.data);
      dispatch({
        type: 'SEARCH_RESULT',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'SEARCH_ERROR',
        payload: { msg: err, status: err.response.status },
      });
    }
  };
  const setSearch = (item) => {
    dispatch({
      type: 'SET_TERM',
      payload: item,
    });
  };
  const setSort = (item) => {
    dispatch({
      type: 'SET_SORT',
      payload: item,
    });
  };
  const setCat = (item) => {
    dispatch({
      type: 'SET_CAT',
      payload: item,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        ...state,
        dispatch,
        getSearchedVideos,
        setSearch,
        setCat,
        searchResult,
        setSort,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
export const useSearchGlobalContext = () => {
  return useContext(SearchContext);
};
export { SearchContext, SearchProvider };
