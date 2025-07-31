import React, { useState } from 'react';
import { formStyle, inputStyle, buttonStyle, headingStyle, errorStyle, successStyle } from './formStyles';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      const result = await window.leoAPI.forgotPassword({ email });
      if (result.success) {
        setMsg(result.message);
      } else {
        setError(result.error || 'Request failed');
      }
    } catch (err) {
      setError('Internal error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Send Reset Link</button>
      {msg && <div style={successStyle}>{msg}</div>}
      {error && <div style={errorStyle}>{error}</div>}
    </form>
  );
}

export default ForgotPassword;
