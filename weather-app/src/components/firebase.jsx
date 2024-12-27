
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_API_DOMAIN,
	projectId: import.meta.env.VITE_API_PROJECT_ID,
	storageBucket: import.meta.env.VITE_API_BUCKET,
	messagingSenderId: import.meta.env.VITE_API_SENDER_ID,
	appId: import.meta.env.VITE_API_APP_ID,
	measurementId: import.meta.env.VITE_API_MEASURE_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };