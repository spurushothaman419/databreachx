import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import EntityDetector from './pages/EntityDetector';
import { AuthProvider } from './AuthContext';
import AuthGuard from './components/AuthGuard';
import Verify from './pages/Verify'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/admin" element={<AuthGuard><Admin /></AuthGuard>} />
          <Route path="/analyze" element={<AuthGuard><EntityDetector /></AuthGuard>} />
	  <Route path="/verify" element={<Verify />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
