import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBj2hwyOwx07lmjZYGyZoRVLi0pJ4psFd4",
  authDomain: "react-x-clone-ea4c6.firebaseapp.com",
  projectId: "react-x-clone-ea4c6",
  storageBucket: "react-x-clone-ea4c6.appspot.com",
  messagingSenderId: "964900082850",
  appId: "1:964900082850:web:060133861ab0cb5f4973fb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
