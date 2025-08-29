import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_Y7rNJrafcB2feDnjZXjvXanXjTw00uo",
  authDomain: "abaya-store-37cde.firebaseapp.com",
  projectId: "abaya-store-37cde",
  storageBucket: "abaya-store-37cde.firebasestorage.app",
  messagingSenderId: "136804515740",
  appId: "1:136804515740:web:db9c9f351f3b4f362dd259"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();