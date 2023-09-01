<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="login-card col-lg-12 col-xl-11">
          <div class="card text-black">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>

                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <form class="mx-1 mx-md-4" @click.prevent>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c"
                          >Your Email</label
                        >
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control text-secondary"
                          v-model="state.email"
                        />
                        <span class="text-danger" v-if="v$.email.$errors[0]">{{
                          v$.email.$errors[0]["$message"]
                        }}</span>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c"
                          >Password</label
                        >
                        <input
                          type=""
                          id="form3Example4c"
                          class="form-control text-secondary"
                          v-model="state.pass"
                        />
                        <span class="text-danger" v-if="v$.pass.$errors[0]">{{
                          v$.pass.$errors[0]["$message"]
                        }}</span>
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="submit"
                        @click="Login()"
                        class="btn btn-primary btn-lg"
                      >
                        Login
                      </button>
                    </div>
                    <div
                      class="alert alert-warning text-center"
                      v-if="userNotFoundErr"
                      role="alert"
                    >
                      {{ userNotFoundErr }}
                    </div>
                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="button"
                        @click="redirectTo({ val: 'Signup' })"
                        class="btn text-success"
                      >
                        create an account
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "Login",
  setup() {
    const state = reactive({
      email: "",
      pass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required, minLength: minLength(5) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userNotFoundErr: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    // SignUp(){
    //   this.$router.push({name:"Signup"})
    // }
    ...mapActions(["redirectTo"]),
    async Login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("v-success");
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.pass}`
        );
        if (result.status == 200 && result.data.length > 0) {
          console.log(result.data);
          // save to localstorage
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          // success user found
          this.redirectTo({ val: "home" });
        } else {
          this.userNotFoundErr = "User Not Found";
        }
      } else {
        console.log("v-error");
      }
    },
  },
};
</script>

<style scoped></style>
