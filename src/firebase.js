import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "arrayverse.firebaseapp.com",
  projectId: "arrayverse",
  storageBucket: "arrayverse.firebasestorage.app",
  messagingSenderId: "212479495240",
  appId: "1:212479495240:web:9a6933c41233c13becdc7d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);