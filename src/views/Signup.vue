<template>
  <div class="signup m-0 position-relative">
    <Signup></Signup>
  </div>
</template>

<script>
import Signup from '@/components/Signup/signup.vue';
export default {
  name: "SignUp",
  components: {
    Signup,
  },
};
</script>

<style scoped>
.signup{
  height: 100vh;
}
</style>
