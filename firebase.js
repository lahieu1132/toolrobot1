// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOWa27Bg3Mb5ZKAiTUxfl6qprWF1p2ZqA",
  authDomain: "toolrobot1.firebaseapp.com",
  databaseURL: "https://toolrobot1-default-rtdb.firebaseio.com",
  projectId: "toolrobot1",
  storageBucket: "toolrobot1.appspot.com",
  messagingSenderId: "776883656886",
  appId: "1:776883656886:web:723e9d4cdf2f57bf85ee17",
  measurementId: "G-FDE6Z03TT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app);