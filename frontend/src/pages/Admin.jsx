import React from "react";
import { useAuth } from "../hooks/useAuth";

const Admin = () => {
  const { user } = useAuth();

  if (user?.user_metadata?.tier !== "admin") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Welcome Admin: {user.email}</p>
    </div>
  );
};

export default Admin;