<template>
  <Navbar />

  <!-- Breadcrumb Start -->
  <div class="container-fluid">
    <div class="row px-xl-5">
      <div class="col-12">
        <nav class="breadcrumb bg-light mb-30">
          <a class="breadcrumb-item text-dark" href="#">Categories</a>

          <a class="breadcrumb-item text-dark" href="#">{{ categoryName }}</a>
        </nav>
      </div>
    </div>
  </div>
  <!-- Breadcrumb End -->

  <!-- Shop Start -->
  <div class="container-fluid">
    <div class="row px-xl-5">
      <!-- Shop Sidebar Start -->
      <div class="col-lg-3 col-md-4">
        <!-- Price Start -->
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="bg-secondary pr-3">Filter by price</span>
        </h5>
        <div class="bg-light p-4 mb-30">
          <form>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input type="number" class="border" v-model="minPrice" />

              <span class="badge border font-weight-normal">min</span>
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input type="number " class="border" v-model="maxPrice" />

              <span class="badge border font-weight-normal">max</span>
            </div>
            <button @click="getProducts">Get Products</button>
          </form>
        </div>
        <!-- Price End -->
      </div>
      <!-- Shop Sidebar End -->

      <!-- Shop Product Start -->
      <div class="col-lg-9 col-md-8">
        <div class="row pb-3">
          <div
            class="col-lg-4 col-md-6 col-sm-6 pb-1"
            v-for="product in products"
            :key="product.id"
          >
            <div class="product-item bg-light mb-4">
              <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" :src="product.image" alt="" />
                <div class="product-action"></div>
              </div>
              <div class="text-center py-4">
                <div class="d-flex align-items-center justify-content-center">
                  <a
                    class="mr-5"
                    v-on:click="showSwal(product)"
                    @click="addToCart(product)"
                    ><i class="fa fa-shopping-cart"></i
                  ></a>
                  <a class="mr-5" @click="addToWishlist(product)"
                    ><i class="far fa-heart"></i
                  ></a>
                  <a class="mr-5" @click="viewProduct(product.id, product)"
                    ><i class="fa fa-eye"></i
                  ></a>
                </div>
                <a class="h6 text-decoration-none text-truncate" href="">{{
                  product.title
                }}</a>
                <div
                  class="d-flex align-items-center justify-content-center mt-2"
                >
                  <h5>${{ product.price }}</h5>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#"><span>Previous</span></a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <!-- Shop Product End -->
    </div>
  </div>
  <!-- Shop End -->
  <Footer />
</template>
<script>
import { ref } from "vue";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getProducts() {
      fetch("http://127.0.0.1:8000/api/filterProductsBYprice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          min_price: 111,
          max_price: 2000,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error(error);
        });
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
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
  },
  data() {
    return {
      products: [],
      category: [],
      categoryName: "",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const params = new URLSearchParams();
    params.append("category_id", id);
    fetch(
      "http://localhost:8000/api/getProductByCategory?" + params.toString(),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.products = data.ProductByCategory;
        this.category = data.getCategory;
        this.categoryName = data.getCategory[0].name;
      })
      .catch((error) => {
        console.error(error);
      });

    ////////////////////
  },
};
</script>
<style></style>
