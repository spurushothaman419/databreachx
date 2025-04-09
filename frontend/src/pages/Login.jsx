import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage('✅ Magic link sent! Please check your email to log in.');
    }
  };

  useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    const isMagicLinkCallback = window.location.href.includes('type=magiclink');

    if (data.session && isMagicLinkCallback) {
      navigate('/dashboard');
    }
  };

  checkSession();

  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      navigate('/dashboard');
    }
  });

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);


  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Login with Email</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Magic Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
