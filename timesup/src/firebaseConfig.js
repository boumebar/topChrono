// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2lzS56CRtQ4FP4NEebUPTnSa0McslTdQ",
    authDomain: "boume-timesup.firebaseapp.com",
    projectId: "boume-timesup",
    storageBucket: "boume-timesup.appspot.com",
    messagingSenderId: "897012356563",
    appId: "1:897012356563:web:777a901925107be23b0b26"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
