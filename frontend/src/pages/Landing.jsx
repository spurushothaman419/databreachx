// frontend/src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚨 Welcome to DataBreachX</h1>
      <p>Your one-stop tool to detect, monitor, and defend against data breaches.</p>
      <br />
      <button onClick={() => navigate('/login')}>🔐 Login</button>{' '}
      <button onClick={() => navigate('/register')}>📝 Register</button>
    </div>
  );
};

export default Landing;
