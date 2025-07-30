import { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await Auth.signIn(username, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="mb-3">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" type="submit">Login</button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}