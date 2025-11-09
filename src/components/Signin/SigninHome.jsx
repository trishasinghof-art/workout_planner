import React from 'react'

import SignIn from './SignIn';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function SigninHome({ title, description }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <SignIn/>
    </>
  );
}

export default SigninHome;
