// Dashboard.jsx
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = '/';
};

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return null; // Will be redirected
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user.email}</h2>
      <p>Tier: {user.user_metadata?.tier || "Free"}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
