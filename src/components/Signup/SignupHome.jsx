import React from 'react'

import Signup from './Signup';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function SignupHome({ title, description }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/details" replace />;

  return (
    <>
      
      <Signup/>
    </>
  );
}

export default SignupHome;
