import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options: {
    emailRedirectTo: 'https://databreachx.vercel.app/verify'
  } });

    if (error) {
      setMessage(`❌ Registration failed: ${error.message}`);
    } else {
      setMessage('✅ Check your email for the magic link to complete registration.');
    }
  };

  useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    const url = window.location.href;
const isRedirect = url.includes('type=magiclink') || url.includes('type=signup');

    if (data.session && isRedirect) {
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
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
