<template>
  <Navbar></Navbar>
  <div class="container">
    <div class="container bootstrap snippets bootdey">
      <p class="fs-3">Edit Profile</p>
      <hr style="width: 20vw" />
      <div class="row">
        <!-- left column -->
        <div class="col-md-3">
          <div class="text-center">
            <img
              src="@/assets/photos/profile-picture.png"
              class="avatar img-circle img-thumbnail"
              alt="avatar"
            />
            <h6>Upload a different photo...</h6>

            <input type="file" class="form-control" />
          </div>
        </div>

        <!-- edit form column -->
        <div class="col-md-9 personal-info">
          <div
            class="alert alert-warning mt-3 mt-sm-0 text-center"
            role="alert"
            v-if="UpdateErr"
          >
            {{ UpdateErr }}
          </div>
          <h3>Personal info</h3>

          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label">First name:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" v-model="name" />
                <span class="text-danger px-1" v-if="v$.name.$errors[0]">{{
                  v$.name.$errors[0]["$message"]
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Last name:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" value="" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Email:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" v-model="email" />
                <span class="text-danger px-1" v-if="v$.email.$errors[0]">{{
                  v$.email.$errors[0]["$message"]
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Password:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" v-model="pass" />
                <span class="text-danger px-1" v-if="v$.pass.$errors[0]">{{
                  v$.pass.$errors[0]["$message"]
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Time Zone:</label>
              <div class="col-lg-8">
                <div class="ui-select">
                  <select id="user_time_zone" class="form-control">
                    <option value="Hawaii">(GMT-10:00) Hawaii</option>
                    <option value="Alaska">(GMT-09:00) Alaska</option>
                    <option value="Pacific Time (US &amp; Canada)">
                      (GMT-08:00) Pacific Time (US &amp; Canada)
                    </option>
                    <option value="Arizona">(GMT-07:00) Arizona</option>
                    <option value="Mountain Time (US &amp; Canada)">
                      (GMT-07:00) Mountain Time (US &amp; Canada)
                    </option>
                    <option
                      value="Central Time (US &amp; Canada)"
                      selected="selected"
                    >
                      (GMT-06:00) Central Time (US &amp; Canada)
                    </option>
                    <option value="Eastern Time (US &amp; Canada)">
                      (GMT-05:00) Eastern Time (US &amp; Canada)
                    </option>
                    <option value="Indiana (East)">
                      (GMT-05:00) Indiana (East)
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="EditProfile()"
              class="btn btn-primary d-block mx-auto px-5 my-4 fw-bold"
            >
              EditProfile
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "EditProfile",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      pass: "",
      userId: "",
      UpdateErr: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      pass: { required, minLength: minLength(5) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
      this.userId = JSON.parse(user).id;
    } else {
      this.redirectTo({ val: "Signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async EditProfile() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("v-success");
        let result = await axios.put(
          `http://localhost:3000/users/${this.userId}`,
          {
            name: this.name,
            email: this.email,
            pass: this.pass,
          }
        );
        console.log(result);
        if (result.status == 200) {
          console.log("update success");
          //update in localstorage
          localStorage.setItem("user-info", JSON.stringify(result.data));
          //go to profile
          this.redirectTo({ val: "profile" });
        } else {
          this.UpdateErr = "Update Faild";
        }
      } else {
        this.UpdateErr = "Update Faild";
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media (max-width: 767px) {
  .form-group {
    display: block;
    text-align: start;
  }
}
</style>
