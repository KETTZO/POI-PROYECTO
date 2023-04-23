import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt5hB1RXZT8C0KTVsAYYBoE1XWB_w8nWU",
  authDomain: "workschool-b03f5.firebaseapp.com",
  projectId: "workschool-b03f5",
  storageBucket: "workschool-b03f5.appspot.com",
  messagingSenderId: "510122329166",
  appId: "1:510122329166:web:d6b6f9b9b0810c21cdaf1f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();