import { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      setSuccess('Registration successful! Please check your email for a confirmation code.');
      onRegister();
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="mb-3">
      <h2>Register</h2>
      <input className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-secondary" type="submit">Register</button>
      {error && <div className="text-danger mt-2">{error}</div>}
      {success && <div className="text-success mt-2">{success}</div>}
    </form>
  );
}