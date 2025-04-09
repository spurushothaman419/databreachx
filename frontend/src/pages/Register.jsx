import { useState, useEffect } from 'react';
// frontend/src/pages/Register.jsx
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session) {
        window.location.href = '/dashboard';
      }
    };
    checkSession();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert('Registration failed');
      return;
    }

    alert('Check your email for the magic link!');
    navigate('/dashboard'); // 👈 redirect after signup
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
