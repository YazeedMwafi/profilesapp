import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "react-oidc-context";

// Determine the correct redirect URI based on environment
const getRedirectUri = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5174/';
  }
  return 'https://main.d15ubhuql9likv.amplifyapp.com/';
};

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_9qe4outOv",
  client_id: "5fej7hpgs2p8qp3k37tq0p3sni",
  redirect_uri: getRedirectUri(),
  response_type: "code",
  scope: "email openid phone",
  automaticSilentRenew: false,
  loadUserInfo: true,
  onSigninCallback: () => {
    // Clear URL parameters after successful signin
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);