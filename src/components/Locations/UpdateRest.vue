<template>
    <Navbar></Navbar>
  
    <section class="vh-100">
      <div class="container-fluid">
        <div class="row container mx-auto">
          <span class="h2 fw-bold text-gray mb-0 mt-3 text-center" style="color: #758584;">Update Restaurant</span>
          <div class="col-sm-6 text-black align-item-center">
            <div
              class="d-flex align-items-center h-custom-2 px-lg-5 ms-xl-4 mt-lg-5 pt-5 pt-xl-0 mt-xl-n5"
            >
              <form style="width: 23rem">
                <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example18"
                    >Restaurant Name</label
                  >
                  <input
                    type="text"
                    id="form2Example18"
                    class="form-control form-control-lg"
                    v-model="name"
                  />
                  <span class="text-danger px-1" v-if="v$.name.$errors[0]">{{
                      v$.name.$errors[0]["$message"]
                    }}</span>
                </div>
  
                <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example8"
                    >Phone Number</label
                  >
                  <input
                    type="text"
                    id="form2Example8"
                    class="form-control form-control-lg"
                    v-model="phone"
                  />
                  <span class="text-danger px-1" v-if="v$.phone.$errors[0]">{{
                      v$.phone.$errors[0]["$message"]
                    }}</span>
                </div>
  
                <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example2">Address</label>
                  <input
                    type="text"
                    id="form2Example2"
                    class="form-control form-control-lg"
                    v-model="address"
                  />
                  <span class="text-danger px-1" v-if="v$.address.$errors[0]">{{
                      v$.address.$errors[0]["$message"]
                    }}</span>
                </div>
  
                <div class="pt-1 mb-4">
                  <button
                    class="btn px-5 py-2 d-block mx-auto text-white fw-bold update-btn"
                    type="button"
                    @click="UpdateRestaurant()"
                    style="width: 200px;"
                  >
                    Update
                  </button>
                </div>
                
                <div
                  class="alert alert-success text-center"
                  v-if="SuccessMessage"
                  role="alert"
                >
                  {{ SuccessMessage }}
                </div>
                <div
                  class="alert alert-danger text-center"
                  v-if="ErrorMessage"
                  role="alert"
                >
                  {{ ErrorMessage }}
                </div>
  
              </form>
            </div>
          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block align-item-center">
            <img
              src="@/assets/photos/Update.png"
              alt="Login image"
              class="w-100"
              style="object-fit: cover; object-position: left;max-width: 500px;"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  import Navbar from "@/components/Header/navbar.vue";
  import { mapActions } from "vuex";
  import useVuelidate from "@vuelidate/core";
  import { required, minLength } from "@vuelidate/validators";
  import axios from "axios";
  
  export default {
    name: "UpdateRestaurant",
    components: {
      Navbar,
    },
    data() {
      return {
        userId: "",
        SuccessMessage: "",
        ErrorMessage: "",
        UpdateRest:"",
        v$: useVuelidate(),
        name: "",
        phone: "",
        address: "",
      };
    },
    validations() {
      return {
        name: { required },
        phone: { required, minLength: minLength(10) },
        address: { required },
      };
    },
    mounted() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.redirectTo({ val: "Signup" });
      } else {
        this.userId = JSON.parse(user).id;
        this.UpdateRest = this.$route.params.restId;
        this.AccessUser();
      }
    },
    methods: {
      ...mapActions(["redirectTo"]),
      async AccessUser() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.UpdateRest}&userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.restaurantData = result.data;
        // console.log(this.restaurantData[0]);
        this.name = this.restaurantData[0].name;
        this.address = this.restaurantData[0].address;
        this.phone = this.restaurantData[0].phone;
      } else {
        this.redirectTo({ val: "home" });
      }
    },
      async UpdateRestaurant() {
        this.v$.$validate();
        if (this.v$.$error) {
          console.log("v-error");
          this.SuccessMessage = "";
          this.ErrorMessage = "fill all required fields";
        } else {
          console.log("Update-success");
          let results = await axios.put(`http://localhost:3000/locations/${this.UpdateRest}`, {
            name: this.name,
            phone: this.phone,
            address: this.address,
            userId: this.userId,
          });
          if (results.status == 200) {
            //show success message
            this.SuccessMessage = "Update successfully";
            this.ErrorMessage = "";
            setTimeout(() => {
              this.redirectTo({ val: "home" });
            }, 1000);
          } else {
            //show Error message
            this.SuccessMessage = "";
            this.ErrorMessage = "Something went wrong , try again!";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .update-btn{
    background-color: #58f3d7;
  }
  .update-btn:hover{
    background-color: #4dd7be;
  }
  @media (min-width: 1025px) {
  .h-custom-2 {
  height: 100%;
  }
  }
    </style>
  