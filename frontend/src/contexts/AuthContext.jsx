import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await api.post('/auth/register', {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
          setUser(res.data.data);
        } catch (error) {
          console.error("Error registering user with backend:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_API_KEY) {
        // Fallback for mock dev
        const uid = 'dev_applicant_1';
        localStorage.setItem('dummyToken', `dev_${uid}`);
        const res = await api.post('/auth/register', {
          firebaseUid: uid,
          email: 'test@example.com',
          displayName: 'Test User'
        });
        setUser(res.data.data);
        return;
      }
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const loginAsAdmin = async () => {
    const uid = 'dev_admin_123';
    localStorage.setItem('dummyToken', `dev_${uid}`);
    const res = await api.post('/auth/register', {
      firebaseUid: uid,
      email: 'admin@system.local',
      displayName: 'System Admin'
    });
    // The backend seed converts this user to admin
    setUser({ ...res.data.data, role: 'admin' });
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem('dummyToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginWithGoogle, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
