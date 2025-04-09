import React from "react";
// frontend/src/components/AuthGuard.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
};

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) navigate('/dashboard');
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) navigate('/dashboard');
  });
}, []);


export default AuthGuard;
