import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [count, setCount] = useState(0);
  const [visits, setVisits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user) {
      fetch('https://zkyjvmub0k.execute-api.eu-central-1.amazonaws.com/visitors', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => setVisits(data.visits))
        .catch(() => setError('Failed to fetch visit count'));
    }
  }, [user]);

  const handleLogin = () => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  };

  const handleLogout = async () => {
    await Auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="container text-center py-5">
        {showRegister ? (
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <button className="btn btn-link" onClick={() => setShowRegister(false)}>Already have an account? Login</button>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <button className="btn btn-link" onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">Profile Visitors Dashboard</h1>
      <div className="card p-4 mx-auto mb-4 shadow-sm" style={{ maxWidth: '400px' }}>
        <h4 className="mb-3">Welcome, {user.attributes?.email || user.username}</h4>
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
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;