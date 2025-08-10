import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBec9hReDUE_uCK0slRhmmEkhqF6WsBxI",
  authDomain: "manga-1a53d.firebaseapp.com",
  projectId: "manga-1a53d",
  storageBucket: "manga-1a53d.firebasestorage.app",
  messagingSenderId: "142163352221",
  appId: "1:142163352221:web:148ce0fa15fb0064841274"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 