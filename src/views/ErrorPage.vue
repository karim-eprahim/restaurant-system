<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="fs-3"><span class="text-danger">Opps!</span> Page not found.</p>
      <p class="lead mb-3">The page doesn’t exist.</p>
      <RouterLink :to="{name:'home'}" >
        <div class="btn btn-primary">GO HOME</div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style scoped></style>
