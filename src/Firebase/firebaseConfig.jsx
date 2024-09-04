import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdccAsPZ-AZyJibbOwyNLzovQm6ATjMKA",
  authDomain: "miniproject-cf8c3.firebaseapp.com",
  projectId: "miniproject-cf8c3",
  storageBucket: "miniproject-cf8c3.appspot.com",
  messagingSenderId: "89616544866",
  appId: "1:89616544866:web:acdcb359e69d6671f60d3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
