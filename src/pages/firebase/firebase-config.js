// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_VzsFHLRT_7GgKGdTnFdqjxoTYfENVY0",
  authDomain: "snap-shot-cfd3e.firebaseapp.com",
  projectId: "snap-shot-cfd3e",
  storageBucket: "snap-shot-cfd3e.appspot.com",
  messagingSenderId: "565716071644",
  appId: "1:565716071644:web:63c910c7a3cf1c666e7019",
  measurementId: "G-SV30ZY34RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)