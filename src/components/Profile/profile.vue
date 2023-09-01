<template>
  <Navbar></Navbar>
  <div class="container">
    <div class="row">
      <div class="mx-auto">
        <!-- Profile widget -->
        <div class="bg-white overflow-hidden">
          <div class="px-4 pt-0 pb-4 cover">
            <div class="media align-items-end d-flex gap-3">
              <div class="profile mr-3">
                <img
                  src="@/assets/photos/profile-picture.png"
                  alt="..."
                  width="130"
                  class="rounded mb-2 img-thumbnail"
                /><a href="#" @click="EditProfile()" class="btn btn-outline-primary btn-sm btn-block"
                  >Edit profile</a
                >
              </div>
              <div class="media-body mb-5">
                <h4 class="mt-0 mb-1">{{ name }}</h4>
                <p class="small mb-4">
                  <i class="fas fa-map-marker-alt mr-2"></i>{{ email }}
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="bg-light p-4 d-flex justify-content-end text-center mb-3">
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <h5 class="font-weight-bold mb-0 d-block">215</h5>
                <small class="text-muted">
                  <i class="fas fa-image mr-1"></i>Photos</small
                >
              </li>
              <li class="list-inline-item">
                <h5 class="font-weight-bold mb-0 d-block">745</h5>
                <small class="text-muted">
                  <i class="fas fa-user mr-1"></i>Followers</small
                >
              </li>
              <li class="list-inline-item">
                <h5 class="font-weight-bold mb-0 d-block">340</h5>
                <small class="text-muted">
                  <i class="fas fa-user mr-1"></i>Following</small
                >
              </li>
            </ul>
          </div> -->
          <div class="px-4 py-3 bg-light mb-3">
            <h5 class="mb-0 fs-4">About</h5>
            <div class="p-4 rounded">
              <p class="font-italic mb-0">name: {{ name }}</p>
              <p class="font-italic mb-0">email: {{ email }}</p>
              <p class="font-italic mb-0">Web Developer</p>
            </div>
          </div>
          <div class="px-4 py-3 bg-light">
            <h5 class="mb-0 fs-4">Security</h5>
            <div class="p-4 rounded">
              <p><span class="">My Password: </span>{{ pass }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "Profile",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    }else{
      this.redirectTo({val:"Signup"})
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    EditProfile() {
      this.redirectTo({ val: "editprofile" });
    },
  },
};
</script>

<style scoped>
.profile.mr-3 {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
</style>
