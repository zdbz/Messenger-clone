import firebase from "firebase";

//pass config value of firebase intp initializaeApp; used to connect to firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAoeYn7k1mJJog9Ybp0bKD93z_B33Zethg",
    authDomain: "facebook-messenger-clone-bd808.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-bd808.firebaseio.com",
    projectId: "facebook-messenger-clone-bd808",
    storageBucket: "facebook-messenger-clone-bd808.appspot.com",
    messagingSenderId: "100880314586",
    appId: "1:100880314586:web:5b8fa2281c43acf75a75e3",
    measurementId: "G-0MS2VL0B5X"
  });

const db = firebase.firestore(); //initialize and assign to db variable

export default db;