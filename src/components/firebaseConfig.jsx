// firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRdwshxz3yWfOvfHl-1EvIefi_d9JKhso",
    authDomain: "prueba-968cc.firebaseapp.com",
    projectId: "prueba-968cc",
    storageBucket: "prueba-968cc.appspot.com",
    messagingSenderId: "976656804441",
    appId: "1:976656804441:web:35c91d7b5d670ea8dbdf48",
    measurementId: "G-BTFBD7C4D8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };