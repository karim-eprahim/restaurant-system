<template>
  <Navbar></Navbar>
  <AddNewRes></AddNewRes>
  <div class="home container my-5">
    <UserRestorants :allrestaurant="listOfLocations"></UserRestorants>
  </div>
    <!-- footer section -->
    <Footer></Footer>
  <!-- footer section -->
</template>

<script>
import Navbar from "@/components/Header/navbar.vue"
import AddNewRes from "@/components/Locations/addrestaurant.vue"
import UserRestorants from "@/components/Locations/UserRestorants.vue"
import Footer from "@/components/Footer/footer.vue";

import axios from "axios";
import { mapActions } from 'vuex';

export default {
  name: "HomeView",
  components:{
    Navbar,
    AddNewRes,
    UserRestorants,
    Footer,
  },
  data() {
    return {
      listOfLocations:[],
      userId:"",
    };
  },
  async mounted() {
    let user =localStorage.getItem("user-info")
    if(!user){
      this.redirectTo({val:"Signup"})
    }else{
      this.userId=JSON.parse(user).id
    }
    let result = await axios.get(`http://localhost:3000/locations?userId=${this.userId}`);
    if(result.status == 200 && result.data.length > 0){
      this.listOfLocations = result.data
      // console.log(this.listOfLocations)
    }
  },
  methods:{
    ...mapActions(["redirectTo"]),
    getUserName(){
    var username = localStorage.getItem("user-info")
    console.log(JSON.parse(username).name)
    }
  }
};
</script>

<style scoped>

</style>
