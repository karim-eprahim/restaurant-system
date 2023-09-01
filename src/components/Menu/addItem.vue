<template>
  <Navbar></Navbar>
  <div class="container">
        <!-- Restaurant Name -->
        <div class="restname d-flex align-items-end gap-3">
      <h2>{{ restName }}</h2>
      <p>{{ restAdress }}</p>
    </div>
    <span
      class="h2 fw-bold text-gray mb-0 mt-3 text-center d-block mb-4 pb-2 pb-md-0 mb-md-5"
      style="color: #758584"
      >Add Item</span
    >
    <div class="row mx-auto align-items-center justify-content-between">
      <div class="col-sm-6 text-black align-items-center p-md-5">
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-12 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="firstName">Item Name</label>
                  <input
                    type="text"
                    id="firstName"
                    class="form-control form-control-lg"
                    v-model="itemName"
                  />
                  <span
                    class="text-danger px-1"
                    v-if="v$.itemName.$errors[0]"
                    >{{ v$.itemName.$errors[0]["$message"] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-4 d-flex align-items-center">
                <div class="form-outline datepicker w-100">
                  <label for="price" class="form-label">Item Price</label>
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    id="price"
                    v-model="itemPrice"
                  />
                  <span
                    class="text-danger px-1"
                    v-if="v$.itemPrice.$errors[0]"
                    >{{ v$.itemPrice.$errors[0]["$message"] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-4 d-flex align-items-center">
                <div class="form-outline datepicker w-100">
                  <label for="Quantity" class="form-label">Item Quantity</label>
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    id="Quantity"
                    v-model="itemQuantity"
                  />
                  <span
                    class="text-danger px-1"
                    v-if="v$.itemQuantity.$errors[0]"
                    >{{ v$.itemQuantity.$errors[0]["$message"] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-4 pb-2">
                <div class="form-outline">
                  <label class="form-label">Item Description</label>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    style="height: 114px"
                    v-model="itemDescrip"
                  ></textarea>
                  <span
                    class="text-danger px-1"
                    v-if="v$.itemDescrip.$errors[0]"
                    >{{ v$.itemDescrip.$errors[0]["$message"] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="dropdown d-flex align-items-center">
                <label class="form-label select-label px-3"
                  >Select Categorie
                </label>

                <select
                  class="form-select w-50 m-0 d-inline"
                  aria-label="Default select example"
                  v-model="selectCate"
                >
                  <option
                    v-for="categorie in listOfCategories"
                    :value="categorie.id"
                  >
                    {{ categorie.name }}
                  </option>
                </select>
              </div>
              <span
                class="text-danger px-4"
                v-if="v$.selectCate.$errors[0]"
                > please select categorie </span
              >
            </div>

            <div class="pt-1 mt-5 d-flex justify-content-center gap-3">
              <router-link :to="{name:'menu'}"
                class="btn btn-secondary d-block text-white fw-bold"
                type="button"
              >
                Go Back
              </router-link>

              <button
                class="btn btn-info px-5 py-2 d-block text-white fw-bold"
                type="button"
                @click="AddItem()"
                style="width: 200px"
              >
                Add Now
              </button>
            </div>
          </form>

          <!-- Success & Error   -->
          <div class="mx-auto mt-4">
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
          </div>
        </div>
      </div>
      <div class="col-sm-5 px-0 d-none d-sm-block align-item-center itemimage">
        <img
          src="@/assets/photos/addItem.png"
          alt="Login image"
          class="w-100"
          style="object-fit: cover; object-position: left; max-width: 500px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength, between } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "AddItem",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      userId: "",
      userName: "",
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      itemDescrip: "",
      selectCate: "",
      restaurantId: this.$route.params.restId,
      restName: "",
      restAdress: "",
      SuccessMessage: "",
      ErrorMessage: "",
    };
  },
  validations() {
    return {
      itemName: { required, minLength: minLength(4) },
      itemPrice: { required,between: between(1, 100000) },
      itemQuantity: { required, between: between(1, 10000) },
      itemDescrip: { required, minLength: minLength(6) },
      selectCate: { required },
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "loggedInUserId",
      "listOfCategories",
      "numOfCategories",
      "listOfRestaurants",
    ]),
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.userName = JSON.parse(user).name;
      this.isloggedInUser();
      this.displayAllCategories({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
      });
      this.canUserAccess({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
        redirectToPage: "home",
      });
      this.getRestaurantInfo(this.userId, this.restaurantId);
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedInUser",
      "displayAllCategories",
      "canUserAccess",
    ]),
    async getRestaurantInfo(userId, restId) {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${userId}&id=${restId}`
      );
      let resDetails = [];
      if (result.status == 200) {
        resDetails = result.data;
        this.restName = resDetails[0].name;
        this.restAdress = resDetails[0].address;
      }
    },
    async AddItem() {
      this.v$.$validate();
      if (this.v$.$error) {
        //show Error message
        this.SuccessMessage = "";
        this.ErrorMessage = "fill all required fields";
      } else {
        console.log("success");
        let result = await axios.post(`http://localhost:3000/items`, {
          name: this.itemName,
          price: this.itemPrice.toString(),
          description: this.itemDescrip,
          qty: this.itemQuantity,
          userId: this.userId,
          catId: this.selectCate,
          restaurantId: this.restaurantId,
        });
        if (result.status == 201) {
          //show success message
          this.SuccessMessage = "Adding Item successfully";
          this.ErrorMessage = "";
          setTimeout(() => {
            this.redirectTo({val:'menu'})
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
.restname {
  border-bottom: 3px solid #a6ded0;
  max-width: 400px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  /* margin-top: -15px; */
}
.restname h2 {
  font-weight: bold;
  font-size: 25px;
}
.restname p {
  font-size: 15px;
}
@media (max-width: 800px) {
  .restname {
    border-bottom: 2px solid lightblue;
    max-width: 250px;
    padding-bottom: 5px;
  }
  .restname h2 {
    font-size: 22px;
  }
  .restname p {
    font-size: 12px;
  }
}
</style>
