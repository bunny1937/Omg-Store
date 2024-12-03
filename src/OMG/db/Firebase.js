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
  apiKey: "AIzaSyBP3Lp_OC01_aq1xyRc0TDfgtiJLg_LdeQ",
  authDomain: "omg-store-a186d.firebaseapp.com",
  projectId: "omg-store-a186d",
  storageBucket: "omg-store-a186d.appspot.com",
  messagingSenderId: "556026600180",
  appId: "1:556026600180:web:c4ff686beaffad79a4dca1",
  measurementId: "G-3MYP90RC60",
  databaseURL: "https://omg-store-a186d-default-rtdb.firebaseio.com/",
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
