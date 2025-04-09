import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚨 <strong>Welcome to DataBreachX</strong></h1>
      <p>Your one-stop tool to detect, monitor, and defend against data breaches.</p>
      <div style={{ marginTop: '1rem' }}>
        <a href="/login"><button>🔐 Login</button></a>
        <a href="/register"><button style={{ marginLeft: '1rem' }}>📄 Register</button></a>
      </div>
    </div>
  );
}

export default Landing;
