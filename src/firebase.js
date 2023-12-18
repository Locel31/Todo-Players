// Import the functions you need from the SDKs you need
import {Timestamp as firestireTimestamp, getFirestore, deleteDoc as firestoreDeleteDoc, setDoc as firestoreSetDoc, doc as firestoreDoc ,collection as firestoreCollection, addDoc as firestoreAddDoc, onSnapshot as firestoreOnSnapshot, orderBy as firestoreOrderBy, getDocs as firestoreGetDocs, getDoc as firestoreGetDoc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgDT89tIhOWKC845ChVttmd9yUSUqQZOM",
    authDomain: "players-8e2f0.firebaseapp.com",
    projectId: "players-8e2f0",
    storageBucket: "players-8e2f0.appspot.com",
    messagingSenderId: "827664896668",
    appId: "1:827664896668:web:857c77229f3e2ec77d1359",
    measurementId: "G-JXJRCE479P"
};

const dateTimetampNow = firestireTimestamp.now();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db, firestoreSetDoc as setDoc, firestoreDoc as doc, firestoreOrderBy as orderBy, firestoreCollection as collection, firestoreAddDoc as addDoc, firestoreOnSnapshot as onSnapshot, firestoreGetDocs as  getDocs, firestoreGetDoc as getDoc, firestoreDeleteDoc as deleteDoc, dateTimetampNow as Timestamp};
