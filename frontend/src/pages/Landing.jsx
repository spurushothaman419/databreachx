// src/pages/Landing.jsx

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Landing() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Only redirect if the user was redirected here via magic link confirmation
      const isMagicLink = location.hash.includes('access_token');

      if (session?.user && isMagicLink) {
        navigate('/dashboard');
      }
    };

    checkSessionAndRedirect();
  }, [navigate, location]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚨 <strong>Welcome to DataBreachX</strong></h1>
      <p>Your one-stop tool to detect, monitor, and defend against data breaches.</p>
      <div style={{ marginTop: '1rem' }}>
        <a href="/login">
          <button>🔐 Login</button>
        </a>
        <a href="/register" style={{ marginLeft: '1rem' }}>
          <button>📄 Register</button>
        </a>
      </div>
    </div>
  );
}

export default Landing;
