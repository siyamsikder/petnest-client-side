import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import API_BASE_URL from "../config/api";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const createUser = (email, passward) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passward).catch((error) => {
      setLoading(false);
      throw error;
    });
  };
  const signInUser = (email, passward) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passward).catch((error) => {
      setLoading(false);
      throw error;
    });
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).catch((error) => {
      setLoading(false);
      throw error;
    });
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };
  const updateUserProfile = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };
  const resetPassword = (email) => {
    setLoading(false);
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // JWT token management
      if (currentUser?.email) {
        const loggedUser = { email: currentUser.email };
        fetch(`${API_BASE_URL}/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loggedUser)
        })
          .then(async res => {
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              console.error("Server Error Detail:", errorData);
              throw new Error(`HTTP error! status: ${res.status} - ${errorData.message || 'Unknown error'}`);
            }
            return res.json();
          })
          .then(data => {
            if (data?.token) {
              localStorage.setItem('access-token', data.token);
            } else {
              localStorage.removeItem('access-token');
            }
            // Always set loading to false after attempt
            setLoading(false);
            setInitialLoading(false);
          })
          .catch(error => {
            console.error('JWT fetch failed:', error);
            // On error, clear token to be safe and stop loading
            localStorage.removeItem('access-token');
            setLoading(false);
            setInitialLoading(false);
          });
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
        setInitialLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createUser,
    user,
    loading,
    initialLoading,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,
    resetPassword,
    setLoading
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
