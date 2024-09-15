import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import ErrorBoundary from './ErrorBoundary.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Auth0Provider
          domain="dev-rxpek1m355qx37e6.us.auth0.com"
          clientId="XVLHapiWHJmEz89B5UabihWrt36Vc58W"
          authorizationParams={{
            redirect_uri: `${window.location.origin}/upload`
          }}
        >
          <App />
        </Auth0Provider>
      </ErrorBoundary>
    </BrowserRouter>


  </React.StrictMode>,
)
