import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyA-dbmuovZ-8_PcEN7kI5QiekofcZOYK8g",
    authDomain: "app-mydo.firebaseapp.com",
    databaseURL: "https://app-mydo.firebaseio.com",
    projectId: "app-mydo",
    storageBucket: "app-mydo.appspot.com",
    messagingSenderId: "471051995142",
    appId: "1:471051995142:web:6c4a416ab82cb9fe791b87",
    measurementId: "G-28HTM6Z0RW"
  })
  .firestore()
