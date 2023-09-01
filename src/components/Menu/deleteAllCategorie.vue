<template>
  <Navbar></Navbar>

  <div class="card mx-auto delcard py-5">
  <!-- Restaurant Name -->
    <div class="restname d-flex align-items-end gap-3  mx-auto px-3">
      <h2>{{ restName }}</h2>
      <p>{{ restAdress }}</p>
    </div>
    <img class="delete-img" src="@/assets/photos/delete-allCate.png" alt="" />
    <div class="card-body text-center">
      <h5 class="card-title text-danger">Delete All Categories</h5>
      <p class="card-text text-warning">
        are you sure you want to delete All Categories for this restaurant ?
      </p>
      <p class="card-text text-warning">
        When Deleting all categories, thier related menu items will be deleted
        as well...
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
          >Go Back</a
        >
        <a
          href="#"
          class="btn btn-danger mt-3 px-4"
          @click="deleteAllCategories()"
          >Delete All</a
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
import { mapActions,mapMutations } from "vuex";

export default {
  name: "DeleteAllCategories",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      restaurantId: this.$route.params.restId,
      restName: "",
      restAdress: "",
      SuccessMessage: "",
      ErrorMessage: "",
      allItemsId:[],
      allCateId:[],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userId = JSON.parse(user).id;
      // access 
      this.canUserAccess({
        userIdIs: this.userId,
        restaurantIdIs: this.restaurantId,
        redirectToPage: "home",
      });
      this.getRestaurantInfo(this.userId, this.restaurantId);
      // get items id 
      let resultitem = await axios.get(
        `http://localhost:3000/items?restaurantId=${this.restaurantId}`
      );
      let resultItemlenght = resultitem.data.length;
      for (let i = 0; i < resultItemlenght; i++) {
        this.allItemsId.push(resultitem.data[i].id);
        console.log(this.allItemsId);
      }
      // get categories id 
      let resultcat = await axios.get(
        `http://localhost:3000/categories?restaurantId=${this.restaurantId}`
      );
      let resultcatlenght = resultcat.data.length;
      for (let i = 0; i < resultcatlenght; i++) {
        this.allCateId.push(resultcat.data[i].id);
        console.log(this.allCateId);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["canUserAccess"]),
    GoBack() {
      // this.redirectTo({ val: "home" });
      this.$router.push({ name: "addCategorie" });
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

    async deleteAllCategories() {
      //delete all itemes in this restaurant
      let allresultItem = []
      for (let i = 0; i < this.allItemsId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsId[i]}`
        );
        if(result.status==200){
          allresultItem.push(true)
        }else{
          allresultItem.push(false)
        }
      }
      //delete all categories in this restaurant
      let allresultCate = []
      for (let i = 0; i < this.allCateId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCateId[i]}`
        );
        if(result.status==200){
          allresultCate.push(true)
        }else{
          allresultCate.push(false)
        }
      }
      if (!allresultCate.includes(false) && !allresultItem.includes(false)) {
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
