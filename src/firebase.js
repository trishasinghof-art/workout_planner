import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


if (!firebaseConfig.apiKey) {
 throw new Error(
    'Missing Firebase API key: set REACT_APP_FIREBASE_API_KEY in a .env.local file (copy .env.local.example) and restart the dev server.'
  );
}

// initialize app
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export async function signUpWithEmail(email, password) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmail(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
	return firebaseSignOut(auth);
}

export function onAuthStateChangedListener(callback) {
	return onAuthStateChanged(auth, callback);
}

export default app;
