<template>
  <Navbar></Navbar>
  <!-- food section -->

  <section class="food_section py-3">
    <div class="container">
      <!-- restaurant info and name  -->
      <div class="restname d-flex align-items-end gap-3">
        <h2>{{ restName }}</h2>
        <p>{{ restAdress }}</p>
      </div>
      <span
        class="h2 fw-bold text-gray mb-0 mt-3 text-center d-block"
        style="color: #758584"
        >Our Menu</span
      >
      <div class="d-flex justify-content-around mt-3">
        <router-link
          :to="{ name: 'addCategorie', params: { restId: restaurantId } }"
        >
          <p class="btn btn-info text-white">View/Add Categories</p>
        </router-link>
        <p
          class="btn fav-btn text-white"
          :class="visiple"
          v-if="
            numOfCategories > 0
              ? (visiple = 'visible')
              : (visiple = 'invisible')
          "
        >
          <router-link
            :to="{ name: 'addItem', params: { restId: restaurantId } }"
            class="text-decoration-none text-white"
            >Add Item</router-link
          >
        </p>
      </div>

      <!-- categorie menu   -->

      <ul class="filters_menu">
        <li
          :class="[selectedCate == 'All' ? 'active' : 'not-active']"
          @click="selectedCate = 'All'"
        >
          All
        </li>
        <li
          :data-filter="categorie.id"
          v-for="categorie in listOfCategories"
          :value="categorie.id"
          @click="handleFilterClick(categorie.id)"
          :class="[selectedCate == categorie.id ? 'active' : 'not-active']"
        >
          {{ categorie.name }}
        </li>
      </ul>

    <!-- num of Items  -->
    <div
      class="numlist d-flex justify-content-between align-items-center"
      v-if="listOfItems.length > 0"
    >
      <p>All Of Items ({{ listOfItems.length }})</p>
      <div>
        <router-link :to="{ name: 'home'}">
          <a class="btn btn-sm btn-secondary mx-3">Home</a>
        </router-link>
        <router-link :to="{ name: 'deleteAllItem', params: { restId: restaurantId } }">
          <a class="btn btn-sm btn-danger">Dellete All</a>
        </router-link>
      </div>
    </div>

    <div v-else>
    <p class="alert alert-warning my-4">No Items Added Yet</p>
  </div>
      <!-- show items -->


      <div class="filters-content">
        <div class="row grid">
          <div
            class="col-sm-6 col-lg-4 all pizza"
            v-for="item in listOfItems"
            :key="item.id"
            :class="[
              selectedCate == item.catId || selectedCate == 'All'
                ? 'd-block'
                : 'd-none',
            ]"
          >
            <div class="box">
              <div>
                <div class="img-box">
                  <img src="@/assets/photos/dinner.png" alt="" />
                </div>
                <div class="detail-box">
                  <h5>{{ item.name }}</h5>
                  <p class="item-desc">
                    {{ item.description }}
                  </p>
                  <p><span class="fw-bold">quantity: </span> {{ item.qty }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <router-link
                  :to="{
                    name: 'updateItem',
                    params: { itemId: item.id, restId: item.restaurantId },
                  }"
                >
                  <button class="btn btn-success m-3 px-4 border-0">
                    Update
                  </button>
                </router-link>

                <router-link
                  :to="{
                    name: 'deleteItem',
                    params: { itemId: item.id, restId: item.restaurantId },
                  }"
                >
                  <button class="btn btn-danger m-3 border-0">Delete</button>
                </router-link>
                <div class="options">
                  <h6>${{ item.price }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end food section -->
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "Menu",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      userName: "",
      visiple: "",
      restaurantId: this.$route.params.restId,
      restName: "",
      restAdress: "",
      listOfItems: [],

      selectedCate: "All",
      itemShow: "",
      classactiv: "",
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
      this.getListOfItems(this.userId, this.restaurantId);
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
    async getListOfItems(userId, restId) {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${userId}&restaurantId=${restId}`
      );
      if (result.status == 200) {
        this.listOfItems = result.data;
      }
    },
    handleFilterClick(catId) {
      console.log(catId);
      this.selectedCate = catId;
      // this.classactiv="active"
    },
  },
};
</script>

<style>
:root {
  --fav-color: #3cc9b0;
  --fav-color-hover: #35ac96;
}
</style>

<style scoped>
.btn-success {
  --bs-btn-color: #fff;
  --bs-btn-bg: #32b593;
}
.btn-danger {
  --bs-btn-color: #fff;
  --bs-btn-bg: #dd3e4d;
}
.restname {
  border-bottom: 3px solid #a6ded0;
  max-width: 400px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  margin-top: -15px;
}
.restname h2 {
  font-weight: bold;
  font-size: 25px;
}
.restname p {
  font-size: 15px;
}
.fav-btn {
  background-color: var(--fav-color);
}
.fav-btn:hover {
  background-color: var(--fav-color-hover);
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
.food_section .filters_menu {
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  row-gap: 15px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  list-style-type: none;
  margin: 45px 0 20px 0;
}

.food_section .filters_menu li {
  padding: 7px 25px;
  cursor: pointer;
  border-radius: 25px;
}

.food_section .filters_menu li.active {
  background-color: var(--fav-color);
  color: #ffffff;
}

.food_section .box {
  position: relative;
  margin-top: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  color: black;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(to bottom, lightgreen, lightblue);
}

.food_section .box .img-box {
  background: #f1f2f3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 215px;
  border-radius: 0 0 0 45px;
  margin: -1px;
  padding: 25px;
}

.food_section .box .img-box img {
  max-width: 100%;
  max-height: 145px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.food_section .box .detail-box {
  position: relative;
  padding: 25px;
}

.food_section .box .detail-box h5 {
  font-weight: 600;
}

.food_section .box .detail-box p {
  font-size: 15px;
  color: #555;
}

.food_section .box .detail-box h6 {
  margin-top: 10px;
}

.food_section .box .options {
  background-color: #3cc9b0;
  width: 57px;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 6px;
  right: 7px;
}
.food_section .box .options h6 {
  font-size: 18px;
  margin: 0;
  /* font-weight: bold; */
}

.food_section .box .options a svg {
  width: 18px;
  height: auto;
  fill: #ffffff;
}

.food_section .box:hover .img-box img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.food_section .btn-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 45px;
}

.food_section .btn-box a {
  display: inline-block;
  padding: 10px 55px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border: none;
}
.item-desc{
  min-height: 45px;
}

.food_section .btn-box a:hover {
  background-color: #e69c00;
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
