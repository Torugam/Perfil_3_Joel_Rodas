import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';  // Añadir esta línea
 
const firebaseConfig = {
  apiKey: "AIzaSyABTQEMtRI3CHkDnEr340R9KoOEGJnpQ9A",
  authDomain: "practica-firebase-20220353.firebaseapp.com",
  projectId: "practica-firebase-20220353",
  storageBucket: "practica-firebase-20220353.appspot.com",
  messagingSenderId: "497741050526",
  appId: "1:497741050526:web:60aa12850d582c9fc2418f"
};  
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);  // Añadir esta línea
 
export { database, storage, auth };