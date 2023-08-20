import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCS-OUtQ8_Wyqv9yAuzuTCg1fzwT5331Tw",
  authDomain: "gaming-assets.firebaseapp.com",
  projectId: "gaming-assets",
  storageBucket: "gaming-assets.appspot.com",
  messagingSenderId: "420786603901",
  appId: "1:420786603901:web:bc65131c9e9ba98184ae14",
  measurementId: "G-DV11HS9RX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)