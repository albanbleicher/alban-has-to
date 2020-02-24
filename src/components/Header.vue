<template lang="html">
<div class="header" v-if='loggedIn'>
    <div class="message">
      <p>myDo</p>
    </div>
    <div class="actions">
      <a  href='#' @click='signOut'>Mon compte</a>
      <a href='#' @click='signOut'>Déconnexion</a>
    </div>
</div>
</template>

<script>
import * as firebase_app from 'firebase/app';
import 'firebase/auth';
export default {
  data() {
    return {
      loggedIn:false,
      myUser:''
    }
  },
  created() {
      firebase_app.auth().onAuthStateChanged(user => {
        this.loggedIn = !!user;
        if (user) {
          localStorage.userId=user.uid;
        }
        else{
          localStorage.clear();
        }
      })
  },
methods: {
  signOut() {
    firebase_app.auth().signOut();
    this.$router.replace({name:'Home'});
    localStorage.clear();
  }
}
}
</script>
