// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// Initialize Cloud Storage
export const storage = getStorage(firebase);
// Initialize Firestore
export const db = getFirestore(firebase);
// Initialize Auth
export const auth = getAuth(firebase);
