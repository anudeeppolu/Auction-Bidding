import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

const LoginRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default LoginRedirect;
