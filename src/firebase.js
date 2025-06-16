import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7yPNAey2YvI7bIafiEtPs_Z09_JqzBmk",
  authDomain: "katbin-33744.firebaseapp.com",
  projectId: "katbin-33744",
  storageBucket: "katbin-33744.firebasestorage.app",
  messagingSenderId: "400357740306",
  appId: "1:400357740306:web:447656c47c2108c6926dcb",
  measurementId: "G-4S302Z5XS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// console.log("Firebase DB:", db);

export { db };
