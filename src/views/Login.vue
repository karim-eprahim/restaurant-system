<template>
    <div class="signup position-relative">
      <Login></Login>
    </div>
  </template>
  
  <script>
  import Login from '@/components/Login/login.vue';
  export default {
    name: "LogIn",
    components: {
        Login,
    },
  };
  </script>
  
<style scoped>
.signup{
  height: 100vh;
}
</style>
