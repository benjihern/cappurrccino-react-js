// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ProcessingInstruction.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: ProcessingInstruction.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: ProcessingInstruction.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: ProcessingInstruction.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ProcessingInstruction.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: ProcessingInstruction.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
