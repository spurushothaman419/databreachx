// frontend/src/hooks/useAuth.jsx
import { useContext } from 'react';
import { AuthContext } from '../src/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
