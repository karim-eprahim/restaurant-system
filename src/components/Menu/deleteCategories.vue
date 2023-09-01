<template>
  <Navbar></Navbar>
  <div class="card mx-auto delcard py-5">
    <img class="delete-img" src="@/assets/photos/delete.png" alt="" />
    <div class="card-body text-center">
      <h5 class="card-title text-danger">
        Delete Categorie {{ name }} # {{ catId }}
      </h5>
      <p class="card-text text-warning">
        are you sure you want to delete this categorie
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
          >Go Back</a
        >
        <a href="#" class="btn btn-danger mt-3 px-4" @click="deleteCategorie()"
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
  name: "DeleteRest",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      restaurantId: this.$route.params.restId,
      catId: this.$route.params.catId,
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
      this.canUserAccessCategorie({
        userIdIs: this.userId,
        catIdIs: this.catId,
        restaurantIdIs: this.restaurantId,
        redirectToPage: "home",
      });
      this.getCategorieName(this.userId, this.restaurantId, this.catId);
      let result = await axios.get(
        `http://localhost:3000/items?catId=${this.catId}`
      );
      let resultlenght = result.data.length;
      for (let i = 0; i < resultlenght; i++) {
        this.allItemsId.push(result.data[i].id);
        console.log(this.allItemsId);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["canUserAccessCategorie"]),
    GoBack() {
      this.redirectTo({ val: "addCategorie" });
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
    async getCategorieName(userId, restId, catId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&restaurantId=${restId}&id=${catId}`
      );
      this.categoriesName = result.data;
      if (result.status == 200) {
        this.name = this.categoriesName[0].name;
      }
    },
    async deleteCategorie() {
      let result = await axios.delete(
        `http://localhost:3000/categories/${this.catId}`
      );
      //delete all itemes in this categorie
      let allresult = []
      for (let i = 0; i < this.allItemsId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsId[i]}`
        );
        if(result.status==200){
            allresult.push(true)
        }else{
            allresult.push(false)
        }
      }
      if (result.status == 200 && !allresult.includes(false)) {
        //show success message
        this.SuccessMessage = "Categorie and related items are deleted ..";
        this.ErrorMessage = "";
        setTimeout(() => {
          this.redirectTo({ val: "addCategorie" });
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
