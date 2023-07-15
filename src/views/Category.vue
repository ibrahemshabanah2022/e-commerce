<template>
  <div class="container-fluid pt-5">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4">
      <span class="pr-3" style="background-color: #f5f5f5">Categories</span>
    </h2>

    <div class="row px-xl-5 pb-3">
      <div
        class="col-lg-3 col-md-4 col-sm-6 pb-1"
        v-for="category in categories"
        :key="category.id"
        @click="filterProducts(category.id)"
      >
        <a class="text-decoration-none">
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 130px; height: 100px">
              <img
                class="img-fluid"
                :src="category.image"
                alt=""
                style="width: 150px; height: 100px"
              />
            </div>
            <div class="flex-fill pl-3">
              <h3>{{ category.name }}</h3>
            </div>
          </div>
        </a>
      </div>
    </div>
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
                  @click="viewProduct(product.id, product)"
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
    </div>
  </div>
  <!-- <Products /> -->
</template>

<script>
import { ref, onMounted } from "vue";

import Products from "./Products.vue";

export default {
  components: {
    Products,
  },
  setup() {
    const products = ref([]);
    const categories = ref([]);

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/api/category");
      const data = await response.json();
      categories.value = data.categories;
    };

    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:8000/api/products?offset=0&limit=12"
      );
      const data = await response.json();
      products.value = data;
    };

    const filterProducts = async (categoryId) => {
      const response = await fetch(`http://localhost:8000/api/products`);
      const data = await response.json();
      const filteredProducts = data.filter(
        (product) => product.category_id === categoryId
      );
      products.value = filteredProducts;
    };

    const searchProducts = async () => {
      const response = await fetch(`http://localhost:8000/api/products`);
      const data = await response.json();
      const filteredProduct = data.filter(
        (product) => product.title === searchTerm.value
      );
      products.value = filteredProduct;
    };

    onMounted(() => {
      fetchCategories();
      fetchProducts();
      searchProducts();
    });

    return {
      products,
      categories,
      filterProducts,
    };
  },
  methods: {
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

        fetch("http://127.0.0.1:8000/api/wishlists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            product_id: product.id,
          }),
        })
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

        fetch("http://127.0.0.1:8000/api/cart/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            product_id: product.id,
            // cart_id: 1,
          }),
        })
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

    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
  },
};
</script>
