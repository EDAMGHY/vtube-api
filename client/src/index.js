import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './actions/auth';
import { ProfileProvider } from './actions/profile';
import { ChannelProvider } from './actions/channel';
import { ThemeProvider } from './actions/theme';
import { SearchProvider } from './actions/search';
import { VideoProvider } from './actions/video';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <ChannelProvider>
            <VideoProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </VideoProvider>
          </ChannelProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
);
