import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzGH9nzlZdnrJou_6DGJV-LYJJkUGhKFo",
  authDomain: "chat-bfbb5.firebaseapp.com",
  projectId: "chat-bfbb5",
  storageBucket: "chat-bfbb5.appspot.com",
  messagingSenderId: "590920184246",
  appId: "1:590920184246:web:6f639305edf6b0b2971117"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();