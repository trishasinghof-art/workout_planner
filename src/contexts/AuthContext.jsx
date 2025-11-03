import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener, signOutUser } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOutUser();
      // navigate to signin after logout
      navigate('/signin');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
