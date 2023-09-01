<template>
  <Navbar></Navbar>
  <div class="container">
    <!-- Restaurant Name -->
    <div class="restname d-flex align-items-end gap-3">
      <h2>{{ restName }}</h2>
      <p>{{ restAdress }}</p>
    </div>

    <!-- Add categories  -->
    <div class="card">
      <div class="card-header">
        <h1 class="text-center fw-bold" style="color: #758584">
          Add Categories
        </h1>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            id="taskInput"
            class="form-control p-2 outline"
            placeholder="new Categorie"
            v-model="name"
          />
          <button
            id="addTaskButton"
            class="btn btn-info text-white fw-bold addbtn"
            @click="AddCategorie"
          >
            Add Categorie
          </button>
        </div>
        <ul id="taskList" class="list-group"></ul>
      </div>
      <span class="text-danger px-1 errormessage" v-if="v$.name.$errors[0]">{{
        v$.name.$errors[0]["$message"]
      }}</span>
    </div>

    <!-- Success & Error   -->
    <div class="w-75 mx-auto mt-3">
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

    <!-- num of categories  -->
    <div
      class="numlist d-flex justify-content-between align-items-center"
      v-if="numOfCategories > 0"
    >
      <p>All Of Categories ({{ numOfCategories }})</p>
      <div>
        <router-link :to="{ name: 'menu', params: { restId: restaurantId } }">
          <a class="btn btn-sm btn-secondary mx-3">Menu</a>
        </router-link>
        <router-link :to="{ name: 'deleteAllCategorie', params: { restId: restaurantId } }">
          <a class="btn btn-sm btn-danger">Dellete All</a>
        </router-link>
      </div>
    </div>

    <!-- else  -->
    <div v-else>
      <p class="alert alert-warning my-4">No Categories Added Yet</p>
    </div>

    <!-- categories  -->
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4 px-4">
      <div class="col px-1" v-for="categorie in listOfCategories">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ categorie.name }}</h5>
            <!-- <p class="card-text">
              This is a longer card with supporting text below as a natural
            </p> -->
            <div class="row justify-content-around mt-3">
              <button
                type="button"
                class="btn btn btn-info mb-1 col-12 col-lg-11"
              >
                Info
              </button>
              <div
                class="d-flex justify-content-between align-items-center mx-auto p-0 px-sm-2 mt-2"
              >
                <router-link
                  :to="{
                    name: 'updateCategories',
                    params: {
                      catId: categorie.id,
                      restId: categorie.restaurantId,
                    },
                  }"
                  class="p-0"
                >
                  <a class="btn btn-sm btn-outline-success">Update</a>
                </router-link>
                <router-link
                  :to="{
                    name: 'deleteCategories',
                    params: {
                      catId: categorie.id,
                      restId: categorie.restaurantId,
                    },
                  }"
                  class="p-0"
                >
                  <a class="btn btn-sm btn-outline-danger">Delete</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "AddCategories",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      userId: "",
      restaurantId: this.$route.params.restId,
      restName: "",
      restAdress: "",
      SuccessMessage: "",
      ErrorMessage: "",
      listOfUserCategories: [],
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(2), maxLength: maxLength(15) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.canUserAccess({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
        redirectToPage: "home",
      });
      this.displayAllCategories({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
      });
      this.getRestaurantInfo(this.userId, this.restaurantId);
      this.displayUserCategories(this.userId, this.restaurantId);
    }
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
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedInUser",
      "displayAllCategories",
      "canUserAccess",
    ]),
    async displayUserCategories(userId, restId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&restaurantId=${restId}`
      );
      if (result.status == 200) {
        this.listOfUserCategories = result.data;
      }
    },
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
    async AddCategorie() {
      this.v$.$validate();
      let filterCategorieName = this.listOfUserCategories.filter(
        (v) => v.name.toLocaleLowerCase() == this.name.toLocaleLowerCase()
      );
      if (filterCategorieName.length > 0) {
        this.SuccessMessage = "";
        this.ErrorMessage = "this categorie aready exist";
      } else {
        if (!this.v$.$error) {
          let result = await axios.post(`http://localhost:3000/categories`, {
            name: this.name,
            userId: this.userId,
            restaurantId: parseInt(this.restaurantId),
          });
          if (result.status == 201) {
            //show success message
            this.SuccessMessage = "Adding successfully";
            this.ErrorMessage = "";
            setTimeout(() => {
              this.$router.push({
                name: "menu",
                params: { restId: this.restaurantId },
              });
            }, 1000);
          } else {
            //show Error message
            this.SuccessMessage = "";
            this.ErrorMessage = "Something went wrong , try again!";
          }
        } else {
          this.SuccessMessage = "";
          this.ErrorMessage = "fill required field";
        }
      }
    },
  },
};
</script>

<style scoped>
.errormessage {
  margin: 0px 0px 10px 16px;
}
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
.form-control:focus {
  outline: none;
  box-shadow: 0 0 5px 0rem rgb(97 228 255 / 65%);
}
.container {
  margin: auto;
}

.card {
  max-width: 800px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.card-body {
  padding: 20px;
}

.input-group {
  margin-bottom: 20px;
}
.numlist {
  padding: 14px;
  background-color: #eee;
  font-weight: bold;
  color: #0d6f83;
  margin-top: 25px;
  border-radius: 6px;
}
.numlist span {
  color: #229ebd;
  font-size: 19px;
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
  .addbtn {
    font-size: 13px;
  }
}
</style>
