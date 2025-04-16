import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZmLuX5VJFX3PSR_11o8mOVl-D_GYpGV4",
  authDomain: "neptunetest-39fdd.firebaseapp.com",
  projectId: "neptunetest-39fdd",
  storageBucket: "neptunetest-39fdd.firebasestorage.app",
  messagingSenderId: "726115934936",
  appId: "1:726115934936:web:e15fe9cadfa788d3912dad",
  measurementId: "G-XSRQ277J30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Get the already initialized Firestore instance
export const firestore = getFirestore(app);