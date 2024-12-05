import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp); // Corrected import
setPersistence(auth, browserSessionPersistence);

export {
  firebaseApp,
  storage,
  storageRef,
  db,
  auth,
  firestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
};
