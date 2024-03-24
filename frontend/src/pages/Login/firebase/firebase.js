// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTb6xnna-VjYIQbeO95OTnJLLAt_fgJIc",
  authDomain: "cappurrccino-ee5a4.firebaseapp.com",
  projectId: "cappurrccino-ee5a4",
  storageBucket: "cappurrccino-ee5a4.appspot.com",
  messagingSenderId: "350195931558",
  appId: "1:350195931558:web:4242bf0889eade587c9767"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
