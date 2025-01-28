// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMYh_mMapVvqGh7_wU_b4uiHkOYbsVTeU",
  authDomain: "qr-web-490ea.firebaseapp.com",
  projectId: "qr-web-490ea",
  storageBucket: "qr-web-490ea.appspot.com",
  messagingSenderId: "1057793073781",
  appId: "1:1057793073781:web:20562855251583e22f0e3c",
  measurementId: "G-56M5SZX4BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
