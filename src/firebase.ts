// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzOYNtBO_wz04qKspGEKxCA5PfYbIN-xk",
  authDomain: "firetsx-6f09e.firebaseapp.com",
  projectId: "firetsx-6f09e",
  storageBucket: "firetsx-6f09e.appspot.com",
  messagingSenderId: "1057452252116",
  appId: "1:1057452252116:web:dd1e0e66a9c0204801d441"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };