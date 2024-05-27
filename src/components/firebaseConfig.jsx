import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0AH0He4Wv_yGdZdb8tXyr6b3pqOTSMWY",
  authDomain: "cannapot-3ffe6.firebaseapp.com",
  projectId: "cannapot-3ffe6",
  storageBucket: "cannapot-3ffe6.appspot.com",
  messagingSenderId: "237888470877",
  appId: "1:237888470877:web:8141fcbbf465061c9af2b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, db, storage };
