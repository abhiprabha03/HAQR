import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMYh_mMapVvqGh7_wU_b4uiHkOYbsVTeU",
  authDomain: "qr-web-490ea.firebaseapp.com",
  projectId: "qr-web-490ea",
  storageBucket: "qr-web-490ea.appspot.com",
  messagingSenderId: "1057793073781",
  appId: "1:1057793073781:web:20562855251583e22f0e3c",
  measurementId: "G-56M5SZX4BM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Ensure popup works without errors
provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider };
=======
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
>>>>>>> 98ab272f02e28411d01471a2f82f9b0f4eb496a2
