import { useState, useEffect } from 'react';
// frontend/src/pages/Login.jsx
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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

 const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    alert('Error logging in');
    return;
  }

  alert('Check your email for the magic link!');
  navigate('/dashboard'); // 👈 redirect after success
};
  
}

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

export default Login;