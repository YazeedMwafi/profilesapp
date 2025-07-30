import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const auth = useAuth();
  const [visits, setVisits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetch('https://zkyjvmub0k.execute-api.eu-central-1.amazonaws.com/visitors', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => setVisits(data.visits))
        .catch(() => setError('Failed to fetch visit count'));
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      auth.signinRedirect(); // Redirect to Cognito login page
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  const handleSignOut = () => {
  const domain = "https://eu-central-19qe4outov.auth.eu-central-1.amazoncognito.com";
  const clientId = "5fej7hpgs2p8qp3k37tq0p3sni";
  const logoutRedirect = window.location.origin + "/"; // http://localhost:5174/

  // Full logout URL
  const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutRedirect)}`;

  // Clear browser storage (optional)
  localStorage.clear();
  sessionStorage.clear();

  // Redirect to logout
  window.location.href = logoutUrl;
};



  if (auth.isLoading) {
    return <div className="text-center py-5">Checking authentication...</div>;
  }

  if (auth.error) {
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">Authentication Error</h5>
        <p>{auth.error.message}</p>
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = window.location.origin;
          }} 
          className="btn btn-warning mt-3"
        >
          Clear Storage & Retry
        </button>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <div className="text-center py-5">Redirecting to login...</div>;
  }

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">Profile Visitors Dashboard</h1>
      <div className="card p-4 mx-auto mb-4 shadow-sm" style={{ maxWidth: '400px' }}>
        <h4 className="mb-3">Welcome, {auth.user?.profile.email || 'User'}</h4>
        <p className="text-muted">This dashboard shows how many times your profile has been visited.</p>
        <p className="fw-bold">
          Visits: {error ? <span className="text-danger">{error}</span> : visits === null ? 'Loading...' : visits}
        </p>
      </div>
      <div className="mt-4">
        <button onClick={handleSignOut} className="btn btn-danger mt-4">
      Sign Out
    </button>
      </div>
    </div>
  );
}

export default App;