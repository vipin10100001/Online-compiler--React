// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this if using Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Add this if using Firestore
import { getStorage } from "firebase/storage"; // Add this if using Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwbfFyq2Oc8lLYf2KIGV0L8fGX3hih8Ig",
  authDomain: "online-compiler-f85b9.firebaseapp.com",
  projectId: "online-compiler-f85b9",
  storageBucket: "online-compiler-f85b9.appspot.com", // Corrected: use ".appspot.com"
  messagingSenderId: "680943145164",
  appId: "1:680943145164:web:37bad72eeba3a729437269",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize other Firebase services
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore (if used)
const storage = getStorage(app); // Initialize Storage (if used)

export { app, auth, db, storage };
