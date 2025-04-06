// frontend/src/pages/Register.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? `❌ ${error.message}` : '✅ A registration link has been sent to your email');
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
