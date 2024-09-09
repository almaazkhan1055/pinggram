import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhMRzrzk8Idf-M5nxS6WAN7n5jraKn-n4",
  authDomain: "pingram-6c6a8.firebaseapp.com",
  projectId: "pingram-6c6a8",
  storageBucket: "pingram-6c6a8.appspot.com",
  messagingSenderId: "767715530643",
  appId: "1:767715530643:web:046043094c5a35acb47a66",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const db = getFirestore(app);
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
