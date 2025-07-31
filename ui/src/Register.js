import React, { useState } from 'react';
import { formStyle, inputStyle, buttonStyle, headingStyle, errorStyle, successStyle } from './formStyles';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      const result = await window.leoAPI.register({ username, password, email });
      if (result.success) {
        setMsg('User registered successfully');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Internal error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Register</button>
      {msg && <div style={successStyle}>{msg}</div>}
      {error && <div style={errorStyle}>{error}</div>}
    </form>
  );
}

export default Register;
