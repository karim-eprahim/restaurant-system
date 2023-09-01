<template>
  <Navbar></Navbar>
  <div class="container">
    <!-- Restaurant Name -->
    <div class="restname d-flex align-items-end gap-3">
      <h2>{{ restName }}</h2>
      <p>{{ restAdress }}</p>
    </div>

    <span
      class="h2 fw-bold text-gray mb-0 mt-3 text-center d-block"
      style="color: #758584"
      >Update Categorie</span
    >

    <div class="row align-items-center mt-5">
      <div class="col">
        <form style="width: 21rem; margin: auto">
          <div class="form-outline mb-4">
            <label class="form-label fw-semi-bold fs-4" for="form2Example18"
              >Categorie Name</label
            >
            <input
              type="text"
              id="form2Example18"
              class="form-control form-control-lg text-secondary"
              v-model="name"
            />
            <span class="text-danger px-1" v-if="v$.name.$errors[0]">{{
              v$.name.$errors[0]["$message"]
            }}</span>
          </div>
        </form>

        <div class="d-flex gap-3 justify-content-center">
          <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
            >Go Back</a
          >
          <a
            href="#"
            class="btn mt-3 px-4 text-white fw-bold update-btn"
            @click="updateCategorie()"
            >Update</a
          >
        </div>

        <!-- error & success message  -->

        <div class="mt-5">
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

      <div class="col px-0 d-none d-sm-block align-item-center">
        <img
          src="@/assets/photos/Update.png"
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
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "UpdateCategories",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      userId: "",
      restaurantId: this.$route.params.restId,
      catId: this.$route.params.catId,
      restName: "",
      restAdress: "",
      SuccessMessage: "",
      ErrorMessage: "",
      listOfUserCategories: [],
      categoriesName: [],
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
      this.canUserAccessCategorie({
        userIdIs: this.userId,
        catIdIs: this.catId,
        restaurantIdIs: this.restaurantId,
        redirectToPage: "home",
      });
      this.displayAllCategories({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
      });
      this.getRestaurantInfo(this.userId, this.restaurantId);
      this.displayUserCategories(this.userId, this.restaurantId);
      this.getCategorieName(this.userId,this.restaurantId,this.catId)
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
      "canUserAccessCategorie",
    ]),
    async displayUserCategories(userId, restId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&restaurantId=${restId}`
      );
      if (result.status == 200) {
        this.listOfUserCategories = result.data;
      }
    },
    async getCategorieName(userId,restId,catId){
      let result = await axios.get(`http://localhost:3000/categories?userId=${userId}&restaurantId=${restId}&id=${catId}`)
      this.categoriesName = result.data
      if(result.status == 200){
        this.name = this.categoriesName[0].name
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
    async updateCategorie() {
      this.v$.$validate();
      let filterCategorieName = this.listOfUserCategories.filter(
        (v) => v.name.toLocaleLowerCase() == this.name.toLocaleLowerCase()
      );
      if (filterCategorieName.length > 0) {
        this.SuccessMessage = "";
        this.ErrorMessage = "this categorie aready exist";
      } else {
        if (!this.v$.$error) {
          let result = await axios.put(
            `http://localhost:3000/categories/${this.catId}`,
            {
              name: this.name,
              userId: this.userId,
              restaurantId: parseInt(this.restaurantId),
            }
          );
          if (result.status == 200) {
            //show success message
            this.SuccessMessage = "Updating successfully";
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
    GoBack() {
      this.redirectTo({ val: "addCategorie" });
    },
  },
};
</script>

<style scoped>
.update-btn {
  background-color: #58f3d7;
}
.update-btn:hover {
  background-color: #4dd7be;
}
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
