import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPRSV8IJk1uP8KM56iCdejLtxGl5lSVjY",
  authDomain: "echo-mvp-3bd91.firebaseapp.com",
  projectId: "echo-mvp-3bd91",
  storageBucket: "echo-mvp-3bd91.appspot.com",
  messagingSenderId: "1008634485899",
  appId: "1:1008634485899:web:0f2fa12172976f0891488e",
  measurementId: "G-R44FESYP91"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();