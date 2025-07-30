import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "react-oidc-context";
import './amplify-config';

const cognitoAuthConfig = {
  authority: "https://eu-central-19qe4outov.auth.eu-central-1.amazoncognito.com",
  client_id: "5fej7hpgs2p8qp3k37tq0p3sni",
  redirect_uri: "https://main.d15ubhuql9likv.amplifyapp.com/",
  response_type: "code",
  scope: "email openid phone",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);