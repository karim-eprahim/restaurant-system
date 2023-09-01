import axios from "axios";
import { createStore } from "vuex";
import router from "../router/index";
var state = {
  isUserLoggedIn:"",
  loggedInUserId:"",
  numOfCategories:"",
  listOfCategories:[],
  listOfRestaurants:[],
  listOfItems:[],
};
var getters = {};
var mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  isloggedInUser(state){
    let user = localStorage.getItem("user-info")
    if(user){
      state.isUserLoggedIn=true;
      state.loggedInUserId = JSON.parse(user).id
    }else{
      state.isUserLoggedIn=false
    }
  },
  async displayAllCategories(state,payload){
    let result = await axios.get(`http://localhost:3000/categories?userId=${payload.userIdIs}&restaurantId=${payload.restaurantIdIs}`)
    if(result.status == 200){
      state.listOfCategories = result.data;
      state.numOfCategories = state.listOfCategories.length;
    }
  },
  async canUserAccess(state,payload){
    let result = await axios.get(`http://localhost:3000/locations?userId=${payload.userIdIs}&id=${payload.restaurantIdIs}`)
    if(result.status == 200){
      state.listOfRestaurants = result.data;
      if(state.listOfRestaurants.length !== 1){
        this.commit("redirectTo",payload.redirectToPage)
      }
    }

  },
  async canUserAccessCategorie(state,payload){
    let result = await axios.get(`http://localhost:3000/categories?userId=${payload.userIdIs}&restaurantId=${payload.restaurantIdIs}&id=${payload.catIdIs}`)
    if(result.status == 200){
      state.listOfCategories = result.data;
      if(state.listOfCategories.length !== 1){
        this.commit("redirectTo",payload.redirectToPage)
      }
    }
  },
  async canUserAccessItem(state,payload){
    let result = await axios.get(`http://localhost:3000/items?userId=${payload.userIdIs}&restaurantId=${payload.restaurantIdIs}&id=${payload.itemIdIs}`)
    if(result.status == 200){
      state.listOfItems = result.data;
      if(state.listOfItems.length !== 1){
        this.commit("redirectTo",payload.redirectToPage)
      }
    }
  }
};
var actions = {
  redirectTo({commit},payload) {
    commit("redirectTo",payload.val);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
