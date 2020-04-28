<template lang="html">
  <div class='land'>
    <h1>Inscription</h1>
    <form class='auth' @submit.prevent="sendForm">
      <p class='error' v-if="error">{{errorMsg}}</p>
      <p class='success' v-if="success">Inscription validée, vous pouvez vous <a href="/#/login?ok">Connexion</a>.</p>
      <input type="text" v-model="name" placeholder="Nom"/>
      <input type="mail" v-model="email" placeholder="Mail"/>
      <input type="password" v-model="password" placeholder="Mot de passe"/>
        <button type='submit'>Inscription</button>
        <p>Déjà inscrit? <a href="/#/login?ok">Connexion</a></p>
        <button class='googleBtn' type="button" name="button" @click='googlePopup'><img src="@/assets/images/google.svg" alt="Google">S'inscrire avec Google</button>

    </form>
  </div>
</template>
<script type="text/javascript">
  import { db } from '../../db.js';
  import firebase from 'firebase/app'
  import 'firebase/auth'
  console.log(db);
  export default {
    data() {
    return {
      name:'',
      email:'',
      password:'',
      error:false,
      success:false,
      errorMsg:''
    }
  },
  methods:{
    sendForm() {
      var self = this;
      self.error=false;
      console.log(self.name);
      console.log(self.email);
      console.log(self.password);
      firebase.auth().createUserWithEmailAndPassword(self.email, self.password).catch(function(error) {
        console.log(error);
        self.error=true;
        if(error.code == 'auth/email-already-in-use') {
        self.errorMsg = 'Email déjà utilisé';
        }
        if(error.code == 'auth/invalid-email') {
          self.errorMsg = 'Adresse e-mail incorrect';
        }
        if(error.code == 'auth/weak-password') {
          self.errorMsg = 'Le mot de passe doit au moins contenir 6 caractères.';
        }
}).then(function() {
  console.log(self.error);
  if (self.error == false) {
    var user = firebase.auth().currentUser;
    db.collection("users").doc(user.uid).set({
        displayName: self.name,
        profilePic: "#",
        mail:self.email,
        userId:user.uid,
        tasks:[]
  })
  self.$router.replace({name:'Dashboard'});
  }
  else {
    console.log('erreur');
  }
});
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     db.collection("users").doc(user.uid).set({
//     displayName: self.name,
//     profilePic: "#",
//     mail:self.email,
//     userId:user.uid
// })
// self.$router.replace({name:'Dashboard'});
//   } else {
//     console.log('pas connecté');
//   }
// });
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


self.$router.replace({name:'Dashboard'});
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
  }
  }
</script>
