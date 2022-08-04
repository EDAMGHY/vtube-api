function themeReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_DARK':
      localStorage.setItem('darkvtube', payload);
      return {
        ...state,
        darkMode: payload,
      };
    case 'TOGGLE_COLOR_SCHEME':
      localStorage.setItem('colorschemevtube', payload);
      return {
        ...state,
        colorScheme: payload,
      };
    case 'RESET_THEME':
      localStorage.removeItem('colorschemevtube');
      localStorage.removeItem('darkvtube');
      return {
        ...state,
        darkMode: 'light',
        colorScheme: 'yellow',
      };
    default:
      return state;
  }
}
export default themeReducer;
