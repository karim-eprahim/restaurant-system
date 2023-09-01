<template>
  <div class="row addres">
    <div
      class="col-sm d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <h3 class="fs-1 fw-bold text-white">
        Welcome <span class="text-info">{{ userName }}</span>
      </h3>
      <p class="text-white w-75 text-center">
        You can view your restaurants and food menus and modify them if you want, and other additions
      </p>
      <!-- Button trigger modal  -->
      <router-link :to="{name:'AddRestaurantForm'}">
      <button
        type="button"
        class="btn btn-lg btn-info fw-bold text-white addbotton"
      >
        Add Restaurant
      </button>
    </router-link>
    
    </div>
    <div class="col-sm center">
      <div
        id="carouselExampleFade"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="@\assets\photos\sliderA.png"
              class="d-block carphoto"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/photos/sliderB.png"
              class="d-block carphoto"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/photos/sliderC.png"
              class="d-block carphoto"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AddRestaurantForm from "@/components/Locations/AddRestaurantForm.vue"
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  components:{
    AddRestaurantForm,
  },
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userName = JSON.parse(user).name;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  }
};
</script>

<style scoped>
.addres {
  background-image: url(@/assets/photos/home-slide-1-1920x800.jpg);
  width: 100%;
  height: 80vh;
  margin: 0px;
}
.carphoto {
  max-width: 450px;
  max-height: 450px;
  margin: auto;
}
.center {
  margin: auto;
}
@media (max-width: 787px) {
  .carphoto {
    max-width: 450px;
    max-height: 450px;
    margin: auto;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .carphoto {
    width: 300px;
    height: 300px;
    margin: auto;
  }
  .differ {
    width: 400px;
    height: 300px;
    margin: auto;
  }
  .addbotton {
    font-size: 17pxn;
  }
}
</style>
