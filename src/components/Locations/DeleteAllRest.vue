<template>
  <Navbar></Navbar>
  <div class="card mx-auto delcard py-5">
    <img class="delete-img" src="@/assets/photos/delete-all.png" alt="" />
    <div class="card-body text-center">
      <h5 class="card-title text-danger">Delete All Restaurants</h5>
      <p class="card-text text-warning">
        are you sure you want to delete All Restaurants ?
      </p>
      <p class="card-text text-warning">
        It will aso delte all realted items and categories... Be Carful !
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <a href="#" class="btn btn-secondary mt-3 px-3" @click="GoBack()"
          >Go Back</a
        >
        <a href="#" class="btn btn-danger mt-3 px-4" @click="deleteAllRest()"
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
import { mapActions } from "vuex";

export default {
  name: "DeleteAllRest",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      SuccessMessage: "",
      ErrorMessage: "",
      AllRestaurantId: [],
      allItemsId: [],
      allCateId: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.userId}`
      );
      let resultlen = result.data.length;
      for (let i = 0; i < resultlen; i++) {
        this.AllRestaurantId.push(result.data[i].id);
      }
      // get items id
      let resultitem = await axios.get(
        `http://localhost:3000/items?userId=${this.userId}`
      );
      let resultItemlenght = resultitem.data.length;
      for (let i = 0; i < resultItemlenght; i++) {
        this.allItemsId.push(resultitem.data[i].id);
      }
      // get categories id
      let resultcat = await axios.get(
        `http://localhost:3000/categories?userId=${this.userId}`
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

    async deleteAllRest() {
      //delete all itemes for this user
      let allresultItem = [];
      for (let i = 0; i < this.allItemsId.length; i++) {
        let resultItem = await axios.delete(
          `http://localhost:3000/items/${this.allItemsId[i]}`
        );
        if (resultItem.status == 200) {
          allresultItem.push(true);
        } else {
          allresultItem.push(false);
        }
      }

      //delete all categories for this user
      let allresultCate = [];
      for (let i = 0; i < this.allCateId.length; i++) {
        let resultCat = await axios.delete(
          `http://localhost:3000/categories/${this.allCateId[i]}`
        );
        if (resultCat.status == 200) {
          allresultCate.push(true);
        } else {
          allresultCate.push(false);
        }
      }

      //delete all restaurant for this user
      let allResults = [];
      for (let i = 0; i < this.AllRestaurantId.length; i++) {
        let resultRest = await axios.delete(
          `http://localhost:3000/locations/${this.AllRestaurantId[i]}`
        );
        if (resultRest.status == 200) {
          allResults.push(true);
        } else allResults.push(false);
        // console.table(allResults);
      }

      if (
        !allResults.includes(false) &&
        !allresultCate.includes(false) &&
        !allresultItem.includes(false)
      ) {
        //show success message
        this.SuccessMessage = "All Restaurant Is Deleted";
        // this.ErrorMessage = "";
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
  width: 300px;
  margin: auto;
  padding: 20px;
}
@media (max-width: 787px) {
  .delcard {
    width: 95%;
  }
}
</style>
