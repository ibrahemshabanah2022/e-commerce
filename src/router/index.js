import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Cart from "../views/Cart.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import MyProfile from "../views/MyProfile.vue";
import Products from "../views/dashboard/html/Products.vue";
import AdminProductDetails from "../views/dashboard/html/AdminProductDetails.vue";
import Wishlist from "../views/Wishlist.vue";
import EditProduct from "../views/dashboard/html/EditProduct.vue";
import AddProduct from "../views/dashboard/html/AddProduct.vue";
import AddCategory from "../views/dashboard/html/AddCategory.vue";
import Categories from "../views/dashboard/html/Categories.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Categories",
      name: "Categories",
      component: Categories,
    },
    {
      path: "/AddCategory",
      name: "AddCategory",
      component: AddCategory,
    },

    {
      path: "/AddProduct",
      name: "AddProduct",
      component: AddProduct,
    },
    {
      path: "/EditProduct/:id",
      name: "EditProduct",
      component: EditProduct,
    },
    {
      path: "/Products",
      name: "Products",
      component: Products,
    },
    {
      path: "/AdminProductDetails/:id",
      name: "AdminProductDetails",
      component: AdminProductDetails,
    },
    /////////////////////////////////////
    {
      path: "/MyProfile",
      name: "MyProfile",
      component: MyProfile,
    },
    {
      path: "/Wishlist",
      name: "Wishlist",
      component: Wishlist,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: ProductDetails,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      // path: '/about',
      // name: 'about',
      // component: () => import('../views/AboutView.vue')
    },
  ],
});

export default router;
