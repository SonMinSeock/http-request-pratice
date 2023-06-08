import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA46PAuJJGcrCsWe55MUHIurOR27Ej0ueM",
  authDomain: "react-http-cd376.firebaseapp.com",
  databaseURL: "https://react-http-cd376-default-rtdb.firebaseio.com",
  projectId: "react-http-cd376",
  storageBucket: "react-http-cd376.appspot.com",
  messagingSenderId: "593802223958",
  appId: "1:593802223958:web:1b27d62cc8a015ed8c36f7",
  measurementId: "G-YWCCSJW1CC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
