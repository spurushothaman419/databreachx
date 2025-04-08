import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <p>Tier: {user?.user_metadata?.tier || "Free"}</p>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default Dashboard;