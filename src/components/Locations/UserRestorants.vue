<template>
  <div v-if="allrestaurant.length > 0">
    <div class="numlist d-flex justify-content-between align-items-center">
      <p>
        List Of Restaurants ( <span>{{ allrestaurant.length }}</span> )
      </p>
      <router-link :to="{ name: 'DeleteAllRest' }">
        <a class="btn btn-danger px-lg-4">Delete All</a>
      </router-link>
    </div>
    <div class="courses py-4">
      <div class="courses-all row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="restaurant in allrestaurant">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ restaurant.name }}</h3>
              <h6 class="card-title">
                <p>phone :</p>
                {{ restaurant.phone }}
              </h6>
              <h6 class="card-text">
                <p>address :</p>
                {{ restaurant.address }}
              </h6>
            </div>
            <router-link
                :to="{ name: 'menu',params: { restId: restaurant.id }}"
                class="btn btn-info text-white fs-bold mx-3"
              >
              View
              </router-link>

            <div class="card-body d-flex justify-content-between">
              <router-link
                :to="{ name: 'UpdateRest', params: { restId: restaurant.id } }"
              >
              <a class="btn text-success">Update</a>
              </router-link>

              <router-link
                :to="{ name: 'DeleteRest', params: { restId: restaurant.id } }"
              >
                <a class="btn text-danger">Delete</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="alert alert-warning my-4">No Restaurants Added Yet</p>
  </div>
</template>

<script>
export default {
  name: "UserRestorants",
  props: ["allrestaurant"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.numlist {
  padding: 14px;
  margin-top: 10px;
  background-color: #eee;
  font-weight: bold;
  color: #0d6f83;
  margin-top: 10px !important;
  border-radius: 6px;
}
.numlist span {
  color: #229ebd;
  font-size: 19px;
}
h6 p {
  display: inline;
  font-size: 18px;
  font-weight: 500;
}
</style>
