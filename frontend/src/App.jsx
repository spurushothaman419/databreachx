import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EntityDetector from "./pages/EntityDetector";
import AuthGuard from "./components/AuthGuard";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
          <Route path="/analyze" element={<AuthGuard><EntityDetector /></AuthGuard>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
