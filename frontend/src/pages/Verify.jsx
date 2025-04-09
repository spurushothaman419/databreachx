// frontend/src/pages/Verify.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerify = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    };
    handleVerify();
  }, [navigate]);

  return <p>Verifying session, please wait...</p>;
};

export default Verify;
