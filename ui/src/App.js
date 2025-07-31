
import './App.css';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ConfigPage from './ConfigPage';
import React, { useState } from 'react';
import VSCodeLayout from './VSCodeLayout';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [sidebar, setSidebar] = useState('explorer');

  let content;
  if (sidebar === 'settings' && user) {
    content = <ConfigPage user={user} />;
  } else if (user) {
    content = (
      <div>
        <h2>Welcome, {user}!</h2>
        <div>This is your main page.</div>
        <button onClick={() => setUser(null)} style={{marginTop:20}}>Logout</button>
      </div>
    );
  } else if (page === 'login') {
    content = <Login onLogin={setUser} />;
  } else if (page === 'register') {
    content = <Register />;
  } else {
    content = <ForgotPassword />;
  }

  return (
    <VSCodeLayout selected={sidebar} onSelect={key => {
      setSidebar(key);
      if (key === 'explorer') setPage('login');
      if (key === 'search') setPage('register');
      if (key === 'user') setPage('forgot');
      // settings handled by sidebar only
    }}>
      {content}
    </VSCodeLayout>
  );
}

export default App;
