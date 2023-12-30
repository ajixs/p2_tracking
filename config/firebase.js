// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlRMl5s0d9tjZxckqk3Z_5a9sDdL0vub8",
  authDomain: "expnezz-de675.firebaseapp.com",
  projectId: "expnezz-de675",
  storageBucket: "expnezz-de675.appspot.com",
  messagingSenderId: "1030308159900",
  appId: "1:1030308159900:web:f2864cf93d0a193af9e859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app