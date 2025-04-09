import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  // If not logged in, redirect to login
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;

  // If logged in and tries to visit login/register, redirect to dashboard
  const protectedRoutes = ['/login', '/register'];
  if (session && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthGuard;
