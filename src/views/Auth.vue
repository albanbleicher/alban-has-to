<template>
  <div class="root">
    <h1>This is an authentification page</h1>
    <div class="wrapper">
      <div class="login">
        <Login/>
      </div>
      <div class="register">
        <Register/>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
export default {
  name: "Auth",
  components: {
    Login,
    Register
  }
};
</script>
