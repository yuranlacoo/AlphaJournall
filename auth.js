import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function loginWithEmail(email, password){ return signInWithEmailAndPassword(auth,email,password); }
export function registerWithEmail(email,password){ return createUserWithEmailAndPassword(auth,email,password); }
export function loginWithGoogle(){ return signInWithPopup(auth, googleProvider); }
export function logout(){ return signOut(auth); }
export function onAuth(cb){ onAuthStateChanged(auth, cb); }
