// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? `❌ ${error.message}` : '✅ Check your email for the magic link');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Login with Email</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
