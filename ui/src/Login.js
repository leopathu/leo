import React, { useState } from 'react';
import { formStyle, inputStyle, buttonStyle, headingStyle, errorStyle } from './formStyles';


function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await window.leoAPI.login({ username, password });
      if (result.success) {
        onLogin(result.user.username);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Internal error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
      <button
        type="submit"
        style={buttonStyle}
      >
        Login
      </button>
      {error && <div style={errorStyle}>{error}</div>}
    </form>
  );
}

export default Login;
