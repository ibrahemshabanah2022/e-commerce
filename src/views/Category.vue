<template>
  <div class="container-fluid pt-5">
    <h2
      class="section-title position-relative text-uppercase mx-xl-5 mb-4"
      id="category"
    >
      <span class="pr-3" style="background-color: #f5f5f5">Categories</span>
    </h2>
    <swiper
      :modules="modules"
      :breakpoints="breakpoints"
      :slides-per-view="5"
      :space-between="11"
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="swiper-container"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="category in categories"
        :key="category.id"
        @click="navigateToCategory(category.id)"
      >
        <a class="text-decoration-none">
          <img
            class="img-fluid"
            :src="category.image"
            alt=""
            style="width: 350px; height: 150px"
          />
          <div class="container text-center cursor-pointer">
            {{ category.name }}

            <!-- <h5 class="align-self-center">{{ category.name }}</h5> -->
          </div>
        </a>
      </swiper-slide>
    </swiper>
  </div>
  <div class="container-fluid pt-5 pb-3">
    <h2
      class="section-title position-relative text-uppercase mx-xl-5 mb-4"
      id="products"
    >
      <span class="pr-3" style="background-color: #f5f5f5">Products</span>
    </h2>
    <div class="input-group mb-5 container justify-content-center w-50">
      <input
        type="text"
        class="form-control"
        placeholder="Search for products"
        v-model="searchTerm"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary bg-warning text-dark"
          type="button"
          @click="searchProducts()"
        >
          Search
        </button>
      </div>
    </div>
    <div>
      <div class="row px-xl-5">
        <div
          class="col-lg-3 col-md-4 col-sm-6 pb-1"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" :src="product.image" alt="" />
              <div class="product-action">
                <a
                  v-on:click="showSwal(product)"
                  class="btn btn-outline-dark btn-square"
                  @click="addToCart(product)"
                  ><i class="fa fa-shopping-cart"></i
                ></a>
                <a
                  class="btn btn-outline-dark btn-square"
                  @click="addToWishlist(product)"
                  ><i class="far fa-heart"></i
                ></a>
                <a
                  class="btn btn-outline-dark btn-square"
                  @click="viewProduct(product.id)"
                  ><i class="fa fa-eye"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href="">{{
                product.title
              }}</a>
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>{{ product.price }}$</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group mb-5 container justify-content-center w-50">
        <div class="pl-5"></div>
        <div class="pl-5">
          <div class="text-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    v-if="pagination.previous"
                    @click="handlePreviousClick"
                    class="page-link"
                    >Previous</a
                  >
                </li>

                <li class="page-item">
                  <a
                    v-if="pagination.next"
                    @click="handleNextClick"
                    class="page-link"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <!-- <ul>
        <li v-if="pagination.previous">
          <a :href="pagination.previous">{{ "Previous" }}</a>
        </li>
        <li v-if="pagination.next">
          <a :href="pagination.next">{{ "Next" }}</a>
        </li>
      </ul> -->
    </div>
  </div>

  <!-- <Products /> -->
</template>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ref, onMounted } from "vue";

import Products from "./Products.vue";

export default {
  name: "ProductList",
  props: {
    initialUrl: {
      type: String,
      default:
        "https://e-commerce-api-production-1c29.up.railway.app/api/products",
    },
  },
  components: {
    Products,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // page: 1,
    };
  },
  setup(props) {
    const searchTerm = ref("");

    const breakpoints = {
      // Set breakpoints for medium and small screens
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      960: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    };
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const products = ref([]);
    const categories = ref([]);
    const pagination = ref({
      previous: null,
      next: null,
    });

    const fetchCategories = async () => {
      const response = await fetch(
        "https://e-commerce-api-production-1c29.up.railway.app/api/category"
      );
      const data = await response.json();
      categories.value = data.categories;
    };

    // const fetchProducts = async () => {
    //   const response = await fetch("https://e-commerce-api-production-1c29.up.railway.app/api/products");
    //   const data = await response.json();
    //   products.value = data.data;
    //   pagination.value.previous = data.links.previous;
    //   pagination.value.next = data.links.next;
    // };
    const fetchProducts = async (url) => {
      const response = await fetch(url || props.initialUrl);
      const data = await response.json();
      products.value = data.data;
      pagination.value.previous = data.links.previous;
      pagination.value.next = data.links.next;
    };

    const handleNextClick = () => {
      fetchProducts(pagination.value.next);
    };

    const handlePreviousClick = () => {
      fetchProducts(pagination.value.previous);
    };

    fetchProducts();
    // const fetchProducts = async (url) => {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   products.value = data.data;
    //   pagination.value.previous = data.links.previous;
    //   pagination.value.next = data.links.next;
    // };

    const filterProducts = async (categoryId) => {
      const response = await fetch(
        `https://e-commerce-api-production-1c29.up.railway.app/api/products`
      );
      const data = await response.json();
      const filteredProducts = data.data.filter(
        (product) => product.category_id == categoryId
      );
      products.value = filteredProducts;
    };

    const searchProducts = async () => {
      const response = await fetch(
        `https://e-commerce-api-production-1c29.up.railway.app/api/products`
      );
      const data = await response.json();
      const filteredProduct = data.data.filter(
        (product) => product.title === searchTerm.value
      );
      products.value = filteredProduct;
    };

    onMounted(() => {
      fetchCategories();
      fetchProducts();
      // searchProducts();
    });

    return {
      searchTerm,

      handleNextClick,
      handlePreviousClick,
      fetchProducts,
      breakpoints,
      pagination,
      products,
      categories,
      filterProducts,
      onSwiper,
      onSlideChange,
      searchProducts,

      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  methods: {
    navigateToCategory(categoryId) {
      localStorage.setItem("categoryId", categoryId);

      this.$router.push(`/categoryProducts`);
    },
    addToWishlist(product) {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        window.location.href = "/login";
        return;
      } else {
        let products =
          JSON.parse(localStorage.getItem("wishlistProducts")) || [];

        // Check if the product is already in the cart
        const productIndex = products.findIndex((p) => p.id === product.id);

        if (productIndex === -1) {
          // If the product is not in the cart, add it to the array
          products.push(product);

          // Save the updated array to local storage
          localStorage.setItem("wishlistProducts", JSON.stringify(products));
          alert("Product added to wishlist");
        } else {
          // If the product is already in the cart, do nothing
          alert("Product already in wishlist");
        }

        fetch(
          "https://e-commerce-api-production-1c29.up.railway.app/api/wishlists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              product_id: product.id,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to add product to wishlist");
            } else {
              // alert("product added succssefuly to wishlist");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            // Handle the response data here
          })
          .catch((error) => {
            console.error(error);
            this.error = "Failed to add product to wishlist";
          });
      }
    },
    addToCart(product) {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        window.location.href = "/login";
        return;
      } else {
        let products = JSON.parse(localStorage.getItem("product")) || [];

        // Check if the product is already in the cart
        const productIndex = products.findIndex((p) => p.id === product.id);

        if (productIndex === -1) {
          // If the product is not in the cart, add it to the array
          products.push(product);

          // Save the updated array to local storage
          localStorage.setItem("product", JSON.stringify(products));
        } else {
          // If the product is already in the cart, do nothing
          alert("Product already in cart");
        }
        //********************************************
        // const userToken = localStorage.getItem("userToken");

        fetch(
          "https://e-commerce-api-production-1c29.up.railway.app/api/cart/addproduct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              product_id: product.id,
              // cart_id: 1,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },

    showSwal(product) {
      let productt = JSON.parse(localStorage.getItem("product")) || [];
      const tIndex = productt.findIndex((p) => p.id === product.id);
      if (tIndex === -1) {
        this.$store.commit("updateCartCount", 1);
      } else {
        this.$store.commit("updateCartCount", 0);
      }
    },

    saveProduct(product) {
      // Get existing products from local storage or create an empty array
      let products = JSON.parse(localStorage.getItem("product")) || [];

      // Check if the product is already in the cart
      const productIndex = products.findIndex((p) => p.id === product.id);

      if (productIndex === -1) {
        // If the product is not in the cart, add it to the array
        products.push(product);

        // Save the updated array to local storage
        localStorage.setItem("product", JSON.stringify(products));
      } else {
        // If the product is already in the cart, do nothing
        alert("Product already in cart");
      }
    },

    viewProduct(ProductId) {
      localStorage.setItem("ProductId", ProductId);

      this.$router.push(`/ProductDetails`);
    },
  },
};
</script>
<style>
a {
  cursor: pointer;
}
.swiper-container {
  width: 90%;
  max-width: 1200px;
}
.v-pagination__next {
  color: blue;
}
/* .swiper-slide {
  width: 100px;
} */
</style>
