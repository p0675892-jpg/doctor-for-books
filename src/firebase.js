import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👑 Your config
const firebaseConfig = {
  apiKey: "AIzaSyA1algidWpZ4ePbfBWhieFz7uVpOrcCifA",
  authDomain: "doctor-for-books.firebaseapp.com",
  projectId: "doctor-for-books",
  storageBucket: "doctor-for-books.appspot.com",
  messagingSenderId: "602038900484",
  appId: "1:602038900484:web:11a491e997a3188816e251",
  measurementId: "G-971JHWZPS4",
};

// ✅ SAFE INITIALISATION
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Services
export const auth = getAuth(app);
export const db = getFirestore(app);
