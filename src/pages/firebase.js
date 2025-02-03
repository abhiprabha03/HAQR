import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-zAcUkhX35BVj9spUOus1_8V1vGfT8_4",
  authDomain: "qrcodeinc-36ca3.firebaseapp.com",
  projectId: "qrcodeinc-36ca3",
  storageBucket: "qrcodeinc-36ca3.firebasestorage.app",
  messagingSenderId: "552239255739",
  appId: "1:552239255739:web:ee380c5457a5be4c2bd99e",
  measurementId: "G-SM04ZRCLRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // ✅ Fix: Initialize and export Firebase authentication
const db = getFirestore(app); // ✅ Fix: Initialize and export Firestore

export { auth, db, analytics };
