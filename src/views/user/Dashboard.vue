<template>
<div class='wrapperApp'>
  <div class="header">
    <div class="message">
      <p>myDo</p>
    </div>
    <div class="actions">
      <router-link to="/user">Mon compte</router-link>
      <a href='#' @click='signOut'>Déconnexion</a>
      <router-link to="/about">À propos</router-link>

    </div>
</div>
  <div id="app-content">
    <div class="hello">
      <img v-if='myUser.profilePic !="#"' :src="myUser.profilePic" class="avatar">
      <h2>Content de vous voir {{myUser.displayName}} 😊</h2>
      <p v-if='!free'>Vous avez <span class='nbTaskCtn'><span class='nbTask'>{{tasks.length}}</span></span> {{tasks.length >1 ? "tâches" : "tâche"}} à effectuer.</p>
      <form @submit.prevent="addTache">
        <input placeholder="Ma nouvelle tâche..." type="text" name="nom" v-model="newTask">
        <button type='submit'>Ajouter</button>
      </form>
      <p v-if='empty' class='error'>Vous devez renseigner une tâche.</p>

    </div>

    <div class='content'>

      <div class="noDo" v-if='free'>
        <img src="../../assets/images/rest.svg" alt="Rien à faire!">
        <p>Vous n'avez rien à faire! Profitez!</p>
      </div>
      <ul v-else>
        <li v-for="(task,key) in tasks" v-bind:key='key' :id='key' >
          <div class='taskElement'>
            <button v-on:click='removeTache' type="button" class="tick" name="button">✔</button>

            <div class="taskContent">
              <p class='title'>{{task.title}}</p>
              <p class='date'>— {{task.date}}</p>
            </div>
          </div>
       </li>
      </ul>


    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import { db } from '@/db'

import firebase from 'firebase/app'
import 'firebase/auth';


export default{
  methods:{
    signOut() {
      firebase.auth().signOut();
      self.$router.replace({name:'Home'});
    },
    removeTache: function(event) {
      event.target.classList.add('ticked');
      console.log(event.target.parentNode.parentNode);
      var currentTask = event.target.parentNode.parentNode.getAttribute('id');
      var self=this;
      setTimeout(function() {
        document.querySelector('.ticked').classList.remove('ticked')
        self.userCollection.update({
      tasks: firebase.firestore.FieldValue.arrayRemove(self.tasks[currentTask])
  })

},800)

    },

    addTache() {
      if(this.newTask =="") {
        this.empty=true;
      }
      else {
        this.empty=false;
        console.log(this.newTask);
        var date = new Date();
        var jour = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var mois = (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var annee = date.getFullYear();

        var today = jour + '/'+mois+'/'+annee;
        var task = {
          id:this.tasks.length,
          title:this.newTask,
          date:today
        }
        this.userCollection.update({
          tasks:firebase.firestore.FieldValue.arrayUnion(task)
        });
        this.newTask = "";
      }

    },
    myLog(content) {
      console.log(content);
    }
  },
  data() {
    return {
      myUser:{},
      tasks:[],
      free:false,
      empty:false,
      newTask:'',
      userCollection:[],
      uid:'',
      firestoreData:[]
    }
  },
  mounted() {
    var self=this;
    console.log('ok');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.uid = user.uid;
        self.userCollection = db.collection('users').doc(user.uid);
        db.collection('users').doc(user.uid)
        .onSnapshot(function(doc) {
            self.myUser = doc.data();
            self.tasks = self.myUser.tasks;
            console.log(user.uid);
            // console.log(self.tasks);
            if(self.tasks.length==0) {
              self.free=true;
            }
            else {
              self.free=false;
            }

        });
      } else {
        self.$router.replace({name:'Home'});
      }
    });

  }
}
</script>
