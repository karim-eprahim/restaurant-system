<template>
  <Navbar></Navbar>

  <!-- about section -->

  <section class="about_section layout_padding my-4 py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="img-box">
            <img src="@\assets\photos\about-img.png" alt="" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>About Us</h2>
            </div>
            <p>
              Our award-winning culinary team has meticulously crafted a menu
              that is a true feast for the senses, featuring a selection of
              genuinely mouth-watering dishes that blend the highest quality
              flavours from around the globe into a one-of-a-kind culinary
              masterpiece.
            </p>
            <p>
              In addition to our exquisite fare, our expert mixologists have
              prepared a range of non-alcoholic and mocktail beverages to
              complement your meal. Whether you are seeking a sophisticated
              evening out or a casual designer dining experience, The Farmhouse
              is the perfect choice for all your culinary needs.
            </p>
            <router-link :to="{ name: 'home' }">
              Home 
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end about section -->

  <!-- client section -->
  <!-- student-feedback  -->
  <div class="student-feedback">
    <div class="container">
      <div class="row">
        <h2 class="fs-2 fw-bold">What Says Our Customers</h2>
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <div class="col carousel-buttons">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="d-block w-100 to-down">
                <i class="fa-solid fa-down-long"></i>
                <i class="fa-solid fa-down-long"></i>
              </div>
              <div class="py-4" style="min-height: 330px;">
                <div class="p-4 rounded-3 row align">
                  <div class="container-fluid">
                    <p class="fs-6">
                      I have to say, I enjoyed every single bite of the meal in
                      (RN). I had a 3 course meal, with a couple of beers.
                      Considering the quality, the price is reasonable. Ideal
                      for those who want a romantic night out. There was also
                      plenty of room for bigger groups.
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center trust"
                  >
                    <div class="trust-img">
                      <img
                        src="@\assets\photos\feedback\charlie-green-3JmfENcL24M-unsplash.jpg"
                        class=""
                        alt=""
                      />
                    </div>
                    <div class="p-3">
                      <h5>William Varan</h5>
                      <p class="text-capitalize hints">Founder Of Vesion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-block w-100 to-down">
                <i class="fa-solid fa-down-long"></i>
                <i class="fa-solid fa-down-long"></i>
              </div>
              <div class="py-4" style="min-height: 330px;">
                <div class="p-4 rounded-3 row align">
                  <div class="container-fluid">
                    <p class="fs-6">
                      Excellent food. Menu is extensive and seasonal to a
                      particularly high standard. Definitely fine dining. It can
                      be expensive but worth it and they do different deals on
                      different nights so it’s worth checking them out before
                      you book. Highly recommended.
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center trust"
                  >
                    <div class="trust-img">
                      <img
                        src="@\assets\photos\feedback\andrew-power-y9L5-wmifaY-unsplash.jpg"
                        class=""
                        alt=""
                      />
                    </div>
                    <div class="p-3">
                      <h5>Gaber Mohamed</h5>
                      <p class="text-capitalize hints">Computer & programer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-block w-100 to-down">
                <i class="fa-solid fa-down-long"></i>
                <i class="fa-solid fa-down-long"></i>
              </div>
              <div class="py-4" style="min-height: 330px;">
                <div class="p-4 rounded-3 align">
                  <div class="container-fluid">
                    <p class="fs-6">
                      This place is great! Atmosphere is chill and cool but the
                      staff is also really friendly. They know what they’re
                      doing and what they’re talking about, and you can tell
                      making the customers happy is their main priority. Food is
                      pretty good, some italian classics and some twists, and
                      for their prices it’s 100% worth it.
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center trust"
                  >
                    <div class="trust-img">
                      <img
                        src="@\assets\photos\feedback\albert-dera-ILip77SbmOE-unsplash.jpg"
                        class=""
                        alt=""
                      />
                    </div>
                    <div class="p-3">
                      <h5>Mahmoud Ayman</h5>
                      <p class="text-capitalize hints">Embided system</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- end client section -->

  <!-- footer section -->
  <Footer></Footer>
  <!-- footer section -->
</template>

<script>
import Navbar from "@/components/Header/navbar.vue";
import Footer from "@/components/Footer/footer.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "UserRestorants",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      userName: "",
      userId: "",
      allrestaurant: [],
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    this.showRestaurant();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async showRestaurant() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.userId}`
      );
      if (result.status == 200) {
        this.allrestaurant = result.data;
      }
    },
  },
};
</script>
<style scoped>
.align {
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: auto;
  background-color: #eee;
  margin-bottom: 10px;
}
h6 p {
  display: inline;
  font-size: 18px;
  font-weight: 500;
}
/* ************************* */
.about_section {
  background: #f6faff;
  color: #333;
}

.about_section .row {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.about_section .img-box {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.about_section .img-box img {
  width: 100%;
  max-width: 300px;
  position: relative;
  z-index: 2;
}

.about_section .detail-box p {
  margin-top: 15px;
}

.about_section .detail-box a {
  display: inline-block;
  padding: 10px 45px;
  background-color: #3c4b63;
  color: #ffffff;
  border-radius: 45px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border: none;
  margin-top: 15px;
  text-decoration: none;
}

.about_section .detail-box a:hover {
  background-color: #243044;
}

/* student-feedback */
.to-down {
  font-size: 40px;
  color: #358df7;
}
.carousel-control-prev,
.carousel-control-next {
  color: gray !important;
  background-color: #90a9c1 !important;
  display: none !important;
}
.carousel-control-prev span,
.carousel-control-next span {
  color: gray !important;
  background-color: #90a9c1 !important;
}
.carousel-indicators {
  width: 100px;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  list-style: none;
  margin: auto;
  background-color: transparent;
}
.carousel-buttons {
  display: flex;
  justify-content: center;
}
.carousel-indicators [data-bs-target] {
  width: 15px !important;
  height: 15px !important;
  border-radius: 50% !important;
  color: gray;
  background-color: #bfbfcb !important;
}
.carousel-indicators .active {
  background-color: #0e77f0 !important;
}
.trust {
  gap: 20px;
}
.trust-img {
  width: 100px !important;
  height: 100px;
}
.trust img {
  width: 100px;
  height: 100px;
  border: 7px solid #dbe7ed91;
  border-radius: 50%;
}
@media (max-width: 787px) {
  .carousel-indicators {
    width: 100%;
    position: absolute;
    right: 0px !important;
    bottom: 0px !important;
    left: auto !important;
    margin: 0px !important;
  }
}
@media (max-width: 1250px) {
  .student-feedback .star-images {
    padding-top: 100px !important;
  }
}

@media (max-width: 767px) {
  .about_section .img-box img {
  max-width: 200px;
}
  .about_section .detail-box,
  .book_section .form_container {
    margin-bottom: 45px;
  }

  .about_section .row {
    flex-direction: column-reverse;
  }
}
</style>

