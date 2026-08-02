import React, { useState } from 'react';
import axios from 'axios';

// Dynamically sets API URL based on AWS build environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userToken, setUserToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
      setMessage(res.data.message);
      if (isLogin && res.data.token) {
        setUserToken(res.data.token);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>AWS DevOps Practice - {isLogin ? 'Login' : 'Register'}</h2>
      {userToken ? (
        <div>
          <h3 style={{ color: 'green' }}>Authenticated Successfully!</h3>
          <p>Logged in as: <strong>{email}</strong></p>
          <button onClick={() => setUserToken(null)}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input 
              type="email" 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '4px' }} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '4px' }} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      )}

      {message && <p style={{ marginTop: '15px', color: userToken ? 'green' : 'red' }}>{message}</p>}

      <p style={{ marginTop: '20px', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </p>
    </div>
  );
}

export default App;