import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_9qe4outOv',
  client_id: '5fej7hpgs2p8qp3k37tq0p3snl',
  redirect_uri: 'https://main.d15ubhuql9likv.amplifyapp.com/',
  post_logout_redirect_uri: 'https://main.d15ubhuql9likv.amplifyapp.com/',
  response_type: 'code',
  scope: 'email openid profile phone',
  automaticSilentRenew: false,
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);