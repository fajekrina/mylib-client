// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZhwBcQeRpj_aSXXq0VA-IQAvtZJPTACc",
  authDomain: "mychat-4662b.firebaseapp.com",
  projectId: "mychat-4662b",
  storageBucket: "mychat-4662b.appspot.com",
  messagingSenderId: "669101656408",
  appId: "1:669101656408:web:1ef34373b6dbb51227bd2d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
