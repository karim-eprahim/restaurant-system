<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="signup-card col-lg-12 col-xl-11">
          <div class="card text-black">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <form class="mx-1 mx-md-4" @click.prevent>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example1c"
                          >Your Name</label
                        >
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control text-secondary"
                          v-model="name"
                        />
                        <span
                          class="text-danger px-1"
                          v-if="v$.name.$errors[0]"
                          >{{ v$.name.$errors[0]["$message"] }}</span
                        >
                      </div>
                    </div>

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
                          v-model="email"
                        />
                        <span
                          class="text-danger px-1"
                          v-if="v$.email.$errors[0]"
                          >{{ v$.email.$errors[0]["$message"] }}</span
                        >
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
                          v-model="pass"
                        />
                        <span
                          class="text-danger px-1"
                          v-if="v$.pass.$errors[0]"
                          >{{ v$.pass.$errors[0]["$message"] }}</span
                        >
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="submit"
                        @click="SignUpNow()"
                        class="btn btn-primary btn-lg"
                      >
                        SignUp Now
                      </button>
                    </div>
                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <p class="">already have account</p>
                      <button
                        type="button"
                        @click="redirectTo({ val: 'Login' })"
                        class="btn text-success py-0"
                      >
                        Login
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
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      v$: useValidate(),
      name: "",
      pass: "",
      email: "",
    };
  },
  validations() {
    return {
      name: { required },
      pass: { required, minLength: minLength(5) },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    // Login(){
    //       this.$router.push({name:"Login"})
    //     }
    //   }
    ...mapActions(["redirectTo"]),
    async SignUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("v success");
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          pass: this.pass,
        });
        if (result.status == 201) {
          console.log("add-success");
          // save to localstorage
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result);
          console.log(JSON.stringify(result.data));
          // success signup and go to home bage
          this.redirectTo({ val: "home" });
        } else {
          console.log("add-faild");
        }
      } else [console.log("v failld")];
    },
  },
};
</script>

<style scoped></style>
