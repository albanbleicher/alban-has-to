<template>
<div class='wrapperApp'>
  <Header/>
  <div id="app-content">
    <h1>Content de vous revoir, {{myUser.displayName}}</h1>
    <div class="form">
      <form @submit.prevent="sendTache">
        <input placeholder="eat, sleep, repeat" type="text" name="nom" v-model="nomTache">
        <button type='submit'>Ajouter</button>
      </form>
    </div>
      <p v-if='empty==true' class='error'>Vous devez renseigner une tâche.</p>

    <div class='content'>
      <div class="noDo" v-if="typeof lesTaches['.value']!='undefined'">
        <img src="../assets/images/rest.svg" alt="Rien à faire!">
        <p>Vous n'avez rien à faire! Profitez!</p>
      </div>
      <ul v-else>
        <li v-for="(uneTache,key) in lesTaches" v-bind:key='key'> <p>{{uneTache.nomTache}}<button @click='removeTache({key})'>Terminée</button></p> </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue';
import {db} from '@/firebase';
import 'firebase/auth';
import * as firebase_app from 'firebase/app';
var lesTachesRef = db.ref('lesTaches');
export default {
  name: 'app',
  mounted() {


      firebase_app.auth().onAuthStateChanged(user => {
        this.loggedIn = user;
        if(this.loggedIn==false) {
          this.$router.replace({name:'Home'});
        }
        this.myUser = user;
      })
  },
  data () {
    return {
      nomTache:'',
      lesTaches:'',
      myUser:'',
      empty:false
    }
  },
  firebase:{
    lesTaches:lesTachesRef
  },
  methods: {
    sendTache() {
        if(!this.nomTache) {
          this.empty=true

        }
        else {
          this.empty=false;
        }
        if(!this.empty){
          lesTachesRef.push({nomTache:this.nomTache, edit:false})
        }
    },
    removeTache(key) {
      // console.log();
      lesTachesRef.child(key['key']).remove()
    },
    myLog(content) {
      console.log(content);
    }
  },
  components: {
    Header
  }
}
</script>
