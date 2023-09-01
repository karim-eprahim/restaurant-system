<template>
  <Navbar></Navbar>
  <div class="card mx-auto delcard py-5">
    <img class="delete-img" src="@/assets/photos/delete.png" alt="" />
    <div class="card-body text-center">
      <h5 class="card-title text-danger">
        Delete Restaurant # {{ deleteRestaurant }}
      </h5>
      <p>{{ name }}</p>
      <p>{{ address }}</p>
      <p>{{ phone }}</p>
      <p class="card-text text-warning">
        are you sure you want to delete this restaurant
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
          >Go Back</a
        >
        <a href="#" class="btn btn-danger mt-3 px-4" @click="deleteRest()"
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
import { mapActions } from "vuex";

export default {
  name: "DeleteRest",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      userId: "",
      deleteRestaurant: "",
      restaurantData: [],
      allItemsId:[],
      allCateId:[],
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
      // get items id
      let resultitem = await axios.get(
        `http://localhost:3000/items?restaurantId=${this.deleteRestaurant}`
      );
      let resultItemlenght = resultitem.data.length;
      for (let i = 0; i < resultItemlenght; i++) {
        this.allItemsId.push(resultitem.data[i].id);
      }
      // get categories id
      let resultcat = await axios.get(
        `http://localhost:3000/categories?restaurantId=${this.deleteRestaurant}`
      );
      let resultcatlenght = resultcat.data.length;
      for (let i = 0; i < resultcatlenght; i++) {
        this.allCateId.push(resultcat.data[i].id);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    GoBack() {
      this.redirectTo({ val: "home" });
    },
    async AccessUser() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.deleteRestaurant}&userId=${this.userId}`
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
    async deleteRest() {
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.deleteRestaurant}`
      );
      //delete all itemes in this restaurant
      let allresultItem = [];
      for (let i = 0; i < this.allItemsId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsId[i]}`
        );
        if (result.status == 200) {
          allresultItem.push(true);
        } else {
          allresultItem.push(false);
        }
      }
      //delete all categories in this restaurant
      let allresultCate = [];
      for (let i = 0; i < this.allCateId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCateId[i]}`
        );
        if (result.status == 200) {
          allresultCate.push(true);
        } else {
          allresultCate.push(false);
        }
      }
      if (result.status == 200 && !allresultCate.includes(false) && !allresultItem.includes(false)) {
        //show success message
        this.SuccessMessage = "Deleting successfully";
        this.ErrorMessage = "";
        setTimeout(() => {
          this.redirectTo({ val: "home" });
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
