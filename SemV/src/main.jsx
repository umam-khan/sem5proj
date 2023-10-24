import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-rijs4falok000vjn.us.auth0.com"
    clientId="XhdDjbCeffab9qvGeibQtzN7e1QPfwLG"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > <App />
  </Auth0Provider>
  ,
)
