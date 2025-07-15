// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMwGzbGo_uLUCx1GDCNUzTv8hx1mOU-_k",
  authDomain: "project-vaca.firebaseapp.com",
  projectId: "project-vaca",
  storageBucket: "project-vaca.firebasestorage.app",
  messagingSenderId: "556505161723",
  appId: "1:556505161723:web:8f8cb24b99e709e1d9b55e",
  measurementId: "G-5VL44M600C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
