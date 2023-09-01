import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import profile from "../views/Profile.vue";
import EditProfile from "@/components/Profile/editProfile.vue";
import AddRestaurantForm from "@/components/Locations/AddRestaurantForm.vue";
import DeleteRest from "@/components/Locations/DeleteRest.vue";
import DeleteAllRest from "@/components/Locations/DeleteAllRest.vue";
import UpdateRest from "@/components/Locations/UpdateRest.vue";
import menu from "@/components/Menu/Menu.vue";
import addCategorie from "@/components/Menu/addCategorie.vue";
import addItem from "@/components/Menu/addItem.vue";
import updateItem from "@/components/Menu/updateItem.vue";
import deleteItem from "@/components/Menu/deleteItem.vue";
import deleteAllItem from "@/components/Menu/deleteAllItem.vue";
import updateCategories from "@/components/Menu/updateCategories.vue";
import deleteCategories from "@/components/Menu/deleteCategories.vue";
import deleteAllCategorie from "@/components/Menu/deleteAllCategorie.vue";
import ErrorPage from "../views/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/edit-profile",
    name: "editprofile",
    component: EditProfile,
  },
  {
    path: "/add-restaurant",
    name: "AddRestaurantForm",
    component: AddRestaurantForm,
  },
  {
    path: "/delete-rest/:restId",
    name: "DeleteRest",
    component: DeleteRest,
  },
  {
    path: "/delete-allrest",
    name: "DeleteAllRest",
    component: DeleteAllRest,
  },
  {
    path: "/update-rest/:restId",
    name: "UpdateRest",
    component: UpdateRest,
  },
  {
    path: "/menu/restaurant/:restId",
    name: "menu",
    component: menu,
  },
  {
    path: "/menu/categories/:restId",
    name: "addCategorie",
    component: addCategorie,
  },
  {
    path: "/menu/addItem/:restId",
    name: "addItem",
    component: addItem,
  },
  {
    path: "/menu/updateItem/item/:itemId/rest/:restId",
    name: "updateItem",
    component: updateItem,
  },
  {
    path: "/menu/deleteItem/item/:itemId/rest/:restId",
    name: "deleteItem",
    component: deleteItem,
  },
  {
    path: "/menu/deleteAllItem/rest/:restId",
    name: "deleteAllItem",
    component: deleteAllItem,
  },
  {
    path: "/menu/categories/delete/AllCategorie/:restId",
    name: "deleteAllCategorie",
    component: deleteAllCategorie,
  },
  {
    path: "/menu/categories/update/:restId/:catId",
    name: "updateCategories",
    component: updateCategories,
  },
  {
    path: "/menu/categories/delete/rest/:restId/cat/:catId",
    name: "deleteCategories",
    component: deleteCategories,
  },
  //Error page 
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to,from,next)=>{
  // document.title = to.name
  let home = to.name;
  if (home == "home") {
    home = "";
  }
  document.title = `${process.env.VUE_APP_TITLE} / ${home}`;
  next()
})
export default router;
