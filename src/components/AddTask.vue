<template lang="html">
  <div>
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
    <div>
      <div>
  <article v-for="(item, key) in collection" :key="key">
  <h1>{{ item.nom }}</h1>
  </article>
</div>
</div>
  </div>
</template>

<script>
import {db} from '@/firebase';
import 'firebase';
var collectionList = db.collection('lesTaches');
export default {
  name:'AddTask',
  data() {
    return {
      nomTache:'',
      lesTaches:'',
      myUser:'',
      collection: [],
      nom:'',
      empty:false,
      dtb:db
    }
  },
  firestore() {
    return {
      collection:collectionList
    }
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
          console.log('envoyé');
        }
    },
    removeTache(key) {
      // console.log();
      // lesTachesRef.child(key['key']).remove()
      console.log(key);
      console.log('supprimée');
    },
    myLog(content) {
      console.log(content);
    }
  }
}
</script>
