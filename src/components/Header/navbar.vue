<template>
  <nav>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light mb-3 px-md-3 px-lg-5"
    >
      <div class="container-fluid">
        <div
          class="h-100 d-flex justify-content-center align-items-center gap-2 me-md-4"
        >
          <router-link :to="{ name: 'profile' }">
            <img
              src="@/assets/photos/profile-picture.png"
              class="rounded-circle profile-photo"
              alt=""
            />
          </router-link>
          <p class="fw-bold">{{ userName }}</p>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" class="nav-link"
                >About</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'profile' }" class="nav-link"
                >Profile</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Signup' }" class="nav-link"
                >SignUp</router-link
              >
            </li>
          </ul>
          <div>
            <a class="nav-link text-danger" href="#" @click="logMeOut()"
              >logout</a
            >
          </div>
        </div>
      </div>
    </nav>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userName = JSON.parse(user).name;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    logMeOut() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
    },
  },
};
</script>

<style lang="scss">
nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      // color: #42b983;
      color: #222831;
      font-weight: bold;
    }
  }
}
.profile-photo {
  width: 30px;
  height: 30px;
}
</style>
