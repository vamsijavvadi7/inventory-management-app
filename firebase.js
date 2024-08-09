
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDPEZ3M7S9y8Fc14zvEi0zUJJAbBQ8n6Rw",
  authDomain: "inventory-management-93d71.firebaseapp.com",
  projectId: "inventory-management-93d71",
  storageBucket: "inventory-management-93d71.appspot.com",
  messagingSenderId: "772808208723",
  appId: "1:772808208723:web:e2e9c44ef76dffc3c771a6",
  measurementId: "G-9CRWB33PGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { storage,firestore };