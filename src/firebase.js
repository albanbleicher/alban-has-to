import firebase from 'firebase'
import 'firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyC8ad36JY_3Ug6XR6B7lTpyxwhaQ_ADlek",
    authDomain: "crud-vue-dc270.firebaseapp.com",
    databaseURL: "https://crud-vue-dc270.firebaseio.com",
    projectId: "crud-vue-dc270",
    storageBucket: "crud-vue-dc270.appspot.com",
    messagingSenderId: "465349148796",
    appId: "1:465349148796:web:63d336cc21eaf021b9c9f9",
    measurementId: "G-NPVTV45J3G"
  };
  // Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).database();
  firebase.analytics();
