<template>
    <Navbar></Navbar>
    <div class="card mx-auto delcard py-5">
      <img class="delete-img" src="@/assets/photos/delete.png" alt="" />
      <div class="card-body text-center">
        <h5 class="card-title text-danger">
          Delete Item {{ name }}
        </h5>
        <p class="card-text text-warning">
          are you sure you want to delete this Item
        </p>
        <div class="d-flex gap-3 justify-content-center">
          <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
            >Go Back</a
          >
          <a href="#" class="btn btn-danger mt-3 px-4" @click="deleteItem()"
            >Delete</a
          >
        </div>
      </div>
      <div class="message w-75 mx-auto">
        <div
          class="alert alert-warning text-center"
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
  </template>
  
  <script>
  import Navbar from "@/components/Header/navbar.vue";
  import axios from "axios";
  import { mapActions, mapMutations } from "vuex";
  
  export default {
    name: "DeleteItem",
    components: {
      Navbar,
    },
    data() {
      return {
        name: "",
        restaurantId: this.$route.params.restId,
        itemId: this.$route.params.itemId,
        // catId: this.$route.params.catId,
        userId: "",
        restaurantData: [],
        allItemsId: [],
        SuccessMessage: "",
        ErrorMessage: "",
      };
    },
    async mounted() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.redirectTo({ val: "Signup" });
      } else {
        this.deleteRestaurant = this.$route.params.restId;
        this.userId = JSON.parse(user).id;
        this.AccessUser();
        this.canUserAccessItem({
          userIdIs: this.userId,
          itemIdIs: this.itemId,
          restaurantIdIs: this.restaurantId,
          redirectToPage: "home",
        });
        this.getItemName(this.userId, this.restaurantId, this.itemId);
      }
    },
    methods: {
      ...mapActions(["redirectTo"]),
      ...mapMutations(["canUserAccessItem"]),
      GoBack() {
        this.redirectTo({ val: "menu" });
      },
      async AccessUser() {
        let result = await axios.get(
          `http://localhost:3000/locations?id=${this.deleteRestaurant}&userId=${this.userId}`
        );
        if (result.status == 200 && result.data.length > 0) {
          this.restaurantData = result.data;
          this.name = this.restaurantData[0].name;
          this.address = this.restaurantData[0].address;
          this.phone = this.restaurantData[0].phone;
        } else {
          this.redirectTo({ val: "home" });
        }
      },
      async getItemName(userId, restId, itemId) {
        let result = await axios.get(
          `http://localhost:3000/items?userId=${userId}&restaurantId=${restId}&id=${itemId}`
        );
        this.categoriesName = result.data;
        if (result.status == 200) {
          this.name = this.categoriesName[0].name;
        }
      },
      async deleteItem() {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.itemId}`
        );

        if (result.status == 200) {
          //show success message
          this.SuccessMessage = "Categorie and related items are deleted ..";
          this.ErrorMessage = "";
          setTimeout(() => {
            this.redirectTo({ val: "menu" });
          }, 1000);
        } else {
          //show Error message
          this.SuccessMessage = "";
          this.ErrorMessage = "Something went wrong , try again!";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .delcard {
    width: 70%;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
  .delete-img {
    width: 150px;
    margin: auto;
    padding: 20px;
  }
  @media (max-width: 787px) {
    .delcard {
      width: 95%;
    }
  }
  </style>
  