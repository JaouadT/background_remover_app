// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0BtsZxKAYnzlPN8flIg-U4gdnHLxQ2wg",
  authDomain: "remove-bg-352e5.firebaseapp.com",
  projectId: "remove-bg-352e5",
  storageBucket: "remove-bg-352e5.appspot.com",
  messagingSenderId: "560173152646",
  appId: "1:560173152646:web:f94a8ec425cd2724f51407",
  measurementId: "G-YKBYS4M2P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);