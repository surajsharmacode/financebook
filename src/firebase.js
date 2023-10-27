// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDqZgQzEbcynwCTA4348Nqcda5SXKCv5oU",
  authDomain: "financebook-7c1ab.firebaseapp.com",
  projectId: "financebook-7c1ab",
  storageBucket: "financebook-7c1ab.appspot.com",
  messagingSenderId: "1088932413134",
  appId: "1:1088932413134:web:07ca2f16e0812e5b7d9a9f",
  measurementId: "G-0JDHDKVGLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };