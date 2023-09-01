<template>
  <Navbar></Navbar>
  <div class="card mx-auto delcard py-5">
    <!-- Restaurant Name -->
    <div class="restname d-flex align-items-end gap-3 mx-auto px-3">
      <h2>{{ name }}</h2>
      <p>{{ address }}</p>
    </div>
    <img class="delete-img" src="@/assets/photos/delete-allCate.png" alt="" />
    <div class="card-body text-center">
      <h5 class="card-title text-danger">Delete All Items In {{ name }}</h5>
      <p class="card-text text-warning">
        are you sure you want to delete All Items for this restaurant ?
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
          >Go Back</a
        >
        <a href="#" class="btn btn-danger mt-3 px-4" @click="deleteAllItems()"
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
  name: "DeleteAllItems",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      address: "",
      restaurantId: this.$route.params.restId,
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
      // get items id
      let result = await axios.get(
        `http://localhost:3000/items?restaurantId=${this.restaurantId}&userId=${this.userId}`
      );
      let resultItemlenght = result.data.length;
      for (let i = 0; i < resultItemlenght; i++) {
        this.allItemsId.push(result.data[i].id);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
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
    async deleteAllItems() {
      let allItemsStat = [];
      for (let i = 0; i < this.allItemsId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsId[i]}`
        );
        if (result.status == 200) {
          allItemsStat.push(true);
        } else {
          allItemsStat.push(false);
        }
      }
      if (!allItemsStat.includes(false)) {
        //show success message
        this.SuccessMessage = "All items are deleted ..";
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
.restname {
  border-bottom: 2px solid #a6ded0;
    max-width: 400px;
}
.restname h2 {
  font-weight: bold;
  font-size: 25px;
}
.restname p {
  font-size: 15px;
}
.delcard {
  width: 70%;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
.delete-img {
  width: 250px;
  margin: auto;
  padding: 20px;
}
@media (max-width: 787px) {
  .restname {
    border-bottom: 2px solid lightblue;
    padding-bottom: 5px;
  }
  .restname h2 {
    font-size: 22px;
  }
  .restname p {
    font-size: 12px;
  }
  .delcard {
    width: 95%;
  }
}
</style>
