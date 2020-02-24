<template>
    <div class="land home">
      <img src="../assets/images/do.svg" alt="Todo list illustration">
      <h1>Bienvenue sur myDo</h1>
      <p>Une todo liste simple en Vue.js, liée à Firebase</p>
    <p>  <router-link to="/login">Connexion</router-link> |
       <router-link to="/register">Inscription</router-link></p>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home"
};
</script>
