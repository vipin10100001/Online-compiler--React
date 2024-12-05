// src/GoogleLogin.js
import React from 'react';
import { auth } from '../firebase';  // Import Firebase authentication
import firebase from 'firebase/app';

const GoogleLogin = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      onLoginSuccess(user); // Pass the user data to the parent component
    } catch (error) {
      console.error('Error signing in with Google: ', error.message);
    }
  };

  return (
    <div className="login-container">
      <button onClick={handleLogin} className="login-button">
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
