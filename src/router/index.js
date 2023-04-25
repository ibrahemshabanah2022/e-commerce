import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Cart from "../views/Cart.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
