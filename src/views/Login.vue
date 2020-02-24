<template lang="html">
  <div class='land'>
    <h1>Connexion</h1>
    <form class='auth' @submit.prevent="pressed">
      <p class='error' v-if="error">{{errorMsg}}</p>
      <input type="mail" name="mail" v-model="email" placeholder="Mail"/><br><br>
      <input type="password" name="pass" v-model="password" placeholder="Mot de passe"/> <br><br>
        <button type='submit'>Connexion</button>
        <p>Pas encore de compte ? <router-link to="/register">Inscription</router-link></p>
    </form>
  </div>
</template>
<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods:{
     async pressed() {
       try{
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        localStorage.userId = firebase.auth().currentUser.uid;
        this.$router.replace({name:'Do'});

       }
       catch(err) {

         this.error=true;
         if(err.code == 'auth/wrong-password') {
           this.errorMsg = 'Mot de passe incorrect';
         }
         if(err.code == 'auth/user-not-found') {
           this.errorMsg = 'Compte inexistant';
         }
         if(err.code == 'auth/invalid-email') {
           this.errorMsg = 'Adresse e-mail incorrect';
         }
         if(err.code =='auth/too-many-requests') {
           this.errMsg = 'Nombre maximal de tentatives atteint. Réessayez plus tard.'
         }
       }
     }
  },
  data() {
    return {
      email:'',
      password:'',
      error:''
    }
  }
}
</script>
