// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvOkFFtR6E-CjtwRX8VuosZ8MtX8zj4dA",
  authDomain: "weding-quiz-2706v3.firebaseapp.com",
  projectId: "weding-quiz-2706v3",
  storageBucket: "weding-quiz-2706v3.firebasestorage.app",
  messagingSenderId: "22810188095",
  appId: "1:22810188095:web:8e88779628a3c18a835b8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);

export const provider = new GoogleAuthProvider();

if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(getFunctions(app), "localhost", 5001);
}
