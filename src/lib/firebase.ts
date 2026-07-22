import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(
  app,
  import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)',
);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Restricted domain
googleProvider.setCustomParameters({
  hd: 'lstlkkc.edu.hk'
});

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user.email && !result.user.email.endsWith('@lstlkkc.edu.hk')) {
      await signOut(auth);
      throw new Error('Only @lstlkkc.edu.hk domain is allowed.');
    }
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => signOut(auth);
