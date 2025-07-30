import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const auth = useAuth();
  const [count, setCount] = useState(0);
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

  if (auth.isLoading) {
    return <div className="text-center py-5">Checking authentication...</div>;
  }

  if (auth.error) {
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">Authentication Error</h5>
        <p>{auth.error.message}</p>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="container text-center py-5">
        <h1>Secure Dashboard</h1>
        <p>Please log in to access your profile dashboard.</p>
        <button onClick={() => auth.signinRedirect()} className="btn btn-primary btn-lg">
          Sign In with Cognito
        </button>
      </div>
    );
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
      <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
        <h5 className="mb-3">Local Counter</h5>
        <p className="mb-2">A simple local counter:</p>
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </div>
      <div className="mt-4">
        <button onClick={() => auth.signoutRedirect()} className="btn btn-outline-danger">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;