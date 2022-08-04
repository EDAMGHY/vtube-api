import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthGlobalContext } from './actions/auth';
import { useThemeGlobalContext } from './actions/theme';
import setAuthToken from './utils/setAuthToken';

import NavAside from './components/NavAside';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage';
import Account from './pages/Account';
import Settings from './pages/Settings';
import CreateProfile from './pages/CreateProfile';
import CreateVideo from './pages/CreateVideo';
import EditVideo from './pages/EditVideo';
import SingleVideo from './pages/SingleVideo';
import CreateChannel from './pages/CreateChannel';
import EditChannel from './pages/EditChannel';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';
import AllProfiles from './pages/AllProfiles';
import AllChannels from './pages/AllChannels';
import SingleChannel from './pages/SingleChannel';
import SingleProfile from './pages/SingleProfile';
import Subscriptions from './pages/Subscriptions';
import NotFound from './pages/NotFound';
import NoAccount from './pages/NoAccount';

function App() {
  const { dispatch, loadUser, loadProfile, loadChannel } =
    useAuthGlobalContext();
  const { darkMode, colorScheme } = useThemeGlobalContext();
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.tokenvtube) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.tokenvtube);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    dispatch(loadUser());
    dispatch(loadProfile());
    dispatch(loadChannel());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.tokenvtube) dispatch({ type: 'LOGOUT' });
    });
  }, [localStorage.tokenvtube]);

  useEffect(() => {
    document.body.className = `${darkMode} clr-${colorScheme}`;
  }, [darkMode, colorScheme]);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='channel'>
          <Route index element={<CreateChannel />} />
          <Route path='edit' element={<EditChannel />} />
        </Route>
        <Route path='video'>
          <Route index element={<CreateVideo />} />
          <Route path='edit/:id' element={<EditVideo />} />
          {/* <Route path='edit' element={<EditVideo />} /> */}
        </Route>
        <Route path='profile'>
          <Route index element={<CreateProfile />} />
          <Route path='edit' element={<EditProfile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/no-account' element={<NoAccount />} />
        <Route path='/' element={<NavAside />}>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='account' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='subscriptions' element={<Subscriptions />} />
          <Route path='profiles' element={<AllProfiles />} />
          <Route path='channels' element={<AllChannels />} />
          <Route path='profiles/:id' element={<SingleProfile />} />
          <Route path='channels/:id' element={<SingleChannel />} />
          <Route path='videos/:channel/:id' element={<SingleVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
