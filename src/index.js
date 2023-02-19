import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.scss';
import App from './App';

ReactDOM.render(
  <GoogleOAuthProvider clientId="855320178523-62672ob47hnsume5vib5r5n85943s2nn.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

