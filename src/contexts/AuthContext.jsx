import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener, signOutUser, getUserProfile } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({ user: null, loading: true, profile: null, profileLoading: false });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  
  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    setProfileLoading(true);
    try {
      const data = await getUserProfile(user.uid);
      setProfile(data || null);
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshProfile();
    } else {
      setProfile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logout = async () => {
    try {
      await signOutUser();
      navigate('/');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, profile, profileLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
