<template>
<div class='wrapperApp'>
  <div class="header">
    <div class="message">
      <p>myDo</p>
    </div>
    <div class="actions">
      <router-link to="/dashboard">Mes tâches</router-link>
      <a href='#' @click='signOut'>Déconnexion</a>
    </div>
  </div>
  <div id="app-content">
    <div class="hello">
      <h1>Mon profil</h1>
      <form @submit.prevent="editProfile" class='auth'>
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <p class='error' v-if='errorName'>Le nom ne peut être vide</p>
          <input placeholder="Prénom" type="text" name="prenom" v-model='myUser.displayName'>
        </div>
        <div class="form-group">
          <p>{{myUser.mail}}</p>
        </div>
        <button type='submit'>Changer mes informations</button>
      </form>
    </div>



  </div>
</div>
</template>
<script type="text/javascript">
import {
  db
} from '@/db'

import firebase from 'firebase/app'
import 'firebase/auth';


export default {
  methods: {
    editProfile() {
      console.log('okurrr');
      var self = this;
      if (self.myUser.displayName != '') {
        self.errorName = false;

        self.userCollection.update({
          displayName: self.myUser.displayName,
        })
      } else {
        self.errorName = true;
      }

    },
    signOut() {
      firebase.auth().signOut();
      self.$router.replace({
        name: 'Home'
      });
    }
  },
  data() {
    return {
      myUser: {},
      userCollection: [],
      uid: '',
      errorMail: false,
      errorName: false,
      errorMailMsg: ''
    }
  },
  mounted() {
    var self = this;
    console.log('ok');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.uid = user.uid;
        self.userCollection = db.collection('users').doc(user.uid);
        db.collection('users').doc(user.uid)
          .onSnapshot(function(doc) {
            self.myUser = doc.data();
            console.log(self.myUser);
          });
      } else {
        self.$router.replace({
          name: 'Home'
        });
      }
    });

  }
}
</script>
