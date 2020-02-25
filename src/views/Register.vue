<template lang="html">
  <div class='land'>
    <h1>Inscription</h1>
    <form class='auth' @submit.prevent="pressed">
      <p class='error' v-if="error">{{errorMsg}}</p>
      <p class='success' v-if="success">Inscription validée, vous pouvez vous <router-link to="/login">connecter</router-link>.</p>
      <input type="text" name="name" v-model="name" placeholder="Nom"/><br><br>
      <input type="mail" name="mail" v-model="email" placeholder="Mail"/><br><br>
      <input type="password" name="pass" v-model="password" placeholder="Mot de passe"/> <br><br>
        <button type='submit'>Inscription</button>
        <p>Déjà inscrit? <a href="/login?ok">Connexion</a></p>
    </form>
  </div>
</template>
<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
export default {
  data() {
    return {
      name:'',
      email:'',
      password:'',
      error:'',
      success:false,
      errorMsg:''
    }
  },
  methods:{
    async pressed() {
      try {
         await firebase.auth().createUserWithEmailAndPassword(this.email,this.password);
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        var myUser = firebase.auth().currentUser;
        myUser.updateProfile({
          displayName:this.name,
          photoURL:'https://i.imgur.com/8mUKXWg.png'
        })
        firebase.auth().signOut();
        this.success=true;
        this.name ='';
        this.email='';
        this.password='';
      }
      catch(err) {
        console.log(err);
        this.error=true;
        if(err.code == 'auth/email-already-in-use') {
        this.errorMsg = 'Email déjà utilisé';
        }
        if(err.code == 'auth/invalid-email') {
          this.errorMsg = 'Adresse e-mail incorrect';
        }
        if(err.code == 'auth/weak-password') {
          this.errorMsg = 'Le mot de passe doit au moins contenir 6 caractères.';
        }
      }
    }
  }
}
</script>
