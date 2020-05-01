<template lang="html">
  <div class='land'>
    <h1>Connexion</h1>
    <form class='auth' @submit.prevent="sendForm">
      <p class='error' v-if="error">{{errorMsg}}</p>
      <input type="mail" name="mail" v-model="email" placeholder="Mail"/>
      <input type="password" name="pass" v-model="password" placeholder="Mot de passe"/>
        <button type='submit'>Connexion</button>
        <p>Pas encore de compte ? <router-link to="/register">Inscription</router-link></p>
        <button class='googleBtn' type="button" name="button" @click='googlePopup'><img src="@/assets/images/google.svg" alt="Google">Se connecter avec Google</button>

    </form>
  </div>
</template>
<script>
import { db } from '../../db.js';
import firebase from 'firebase/app'
import 'firebase/auth'
console.log(db);
export default {
  methods:{
    sendForm() {
      var self = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
  self.error=true;
  // var errorCode = error.code;
  self.errorMsg = error.message;
  // ...
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('ok');
    self.$router.replace({name:'Dashboard'});

  } else {
    // No user is signed in.
  }
});
},
googlePopup() {
  var self=this;
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
// This gives you a Google Access Token. You can use it to access the Google API.
var token = result.credential.accessToken;
// The signed-in user info.
var user = result.user;
console.log(token);
console.log(user);
var docRef = db.collection("users").doc(user.uid);

docRef.get().then(function(doc) {
    if (!doc.exists) {
      db.collection("users").doc(user.uid).set({
          displayName: user.displayName,
          profilePic: user.photoURL,
          mail:user.email,
          userId:user.uid,
          tasks:[]
      })
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


setTimeout(function() {
  self.$router.replace({name:'Dashboard'});
}, 1000);
// ...
}).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// The email of the user's account used.
var email = error.email;
// The firebase.auth.AuthCredential type that was used.
var credential = error.credential;
console.log(errorCode);
console.log(errorMessage);
console.log(email);
console.log(credential);
// ...
});
}
  },
  data() {
    return {
      email:'',
      password:'',
      error:false
    }
  },
  mounted(){
    var self=this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.$router.replace({name:'Dashboard'});
      }
    });
  }
}
</script>
