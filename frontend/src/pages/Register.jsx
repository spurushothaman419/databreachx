import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      options: {
        emailRedirectTo: 'https://databreachx.vercel.app/verify'
      }
    });

    if (error) {
      setMessage(`❌ Registration failed: ${error.message}`);
    } else {
      setMessage('✅ Check your email for the magic link to complete registration.');
    }
  };

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
