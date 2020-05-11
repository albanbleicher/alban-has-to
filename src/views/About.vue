<template>
  <div class="about">
    <h1>À propos</h1>
    <p>myDo est une application de to-do list, avec création de compte via mail & mot de passe ou via Google.</p>
    <p>myDo utilise les technologies suivantes : </p>
    <ul>
      <li>Vue.js</li>
      <li>Firebase (Firebase Auth + Firestore)</li>
      <li>Sass</li>
    </ul>
    <p>myDo est un projet mené dans un but d'apprentissage des technologies citées précédemment.</p>
    <p>Illustrations colorées de <a target='blank' href="https://undraw.co/">undraw</a></p>
    <p>Projet hébergé sur la plateforme <a target='blank' href="https://netlify.com/">Netlify</a> via <a target='blank' href="https://github.com/albanbleicher">GitHub</a></p>
    <p>Alban Bleicher  —  2020</p>
  </div>
</template>
<script type="text/javascript">
import {
  db
} from '@/db'
console.log(db);
import firebase from 'firebase/app'
import 'firebase/auth';

export default {
  mounted(){
    var self=this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user == null) {
        self.$router.replace({name:'Home'});
      }
    });
  }
}
</script>
