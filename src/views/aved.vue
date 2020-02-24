<template>
<div class='wrapperApp'>
  <Header/>
  <div id="app-content">
    <h1>Content de vous revoir, {{myUser.displayName}}</h1>

    <!-- myUser.uid = 1234 -->
    <Exemple :userId='myUser.uid'/>

  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue';
import AddTask from '@/components/AddTask.vue';
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
    Header, AddTask
  }
}
</script>
