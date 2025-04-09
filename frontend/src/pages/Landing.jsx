import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      const isRedirectFromAuth =
        location.pathname === '/' &&
        new URLSearchParams(location.search).has('type');

      if (session && isRedirectFromAuth) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate, location]);

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
