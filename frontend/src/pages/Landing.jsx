import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚨 Welcome to <strong>DataBreachX</strong></h1>
      <p>Your one-stop tool to detect, monitor, and defend against data breaches.</p>
      <br />
      <button onClick={() => navigate('/login')}>🔐 Login</button>
      <button onClick={() => navigate('/register')} style={{ marginLeft: '1rem' }}>📝 Register</button>
    </div>
  );
};

export default Landing;
