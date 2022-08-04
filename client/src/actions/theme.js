import React, { useContext, useReducer, useEffect } from 'react';
import themeReducer from '../reducers/theme';
const ThemeContext = React.createContext();

const initialState = {
  darkMode: localStorage.getItem('darkvtube'),
  colorScheme: localStorage.getItem('colorschemevtube'),
};
const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleDarkMode = (theme) => {
    dispatch({ type: 'TOGGLE_DARK', payload: theme });
  };
  const toggleColorScheme = (themeScheme) => {
    dispatch({ type: 'TOGGLE_COLOR_SCHEME', payload: themeScheme });
  };
  const resetTheme = () => {
    dispatch({ type: 'RESET_THEME' });
  };
  return (
    <ThemeContext.Provider
      value={{
        ...state,
        dispatch,
        toggleDarkMode,
        toggleColorScheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook
export const useThemeGlobalContext = () => {
  return useContext(ThemeContext);
};
export { ThemeContext, ThemeProvider };
