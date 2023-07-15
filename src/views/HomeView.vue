<template>
  <Navbar />
  <!-- Carousel Start -->
  <div class="container-fluid mb-3">
    <div class="row px-xl-5">
      <div class="col-lg-8">
        <div
          id="header-carousel"
          class="carousel slide carousel-fade mb-30 mb-lg-0"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#header-carousel"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#header-carousel" data-slide-to="1"></li>
            <li data-target="#header-carousel" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div
              class="carousel-item position-relative active"
              style="height: 430px"
            >
              <img
                class="position-absolute w-100 h-100"
                src="img/carousel-1.jpg"
                style="object-fit: cover"
              />
              <div
                class="carousel-caption d-flex flex-column align-items-center justify-content-center"
              >
                <div class="p-3" style="max-width: 700px">
                  <h1
                    class="display-4 text-white mb-3 animate__animated animate__fadeInDown"
                  >
                    Men Fashion
                  </h1>
                  <p class="mx-md-5 px-5 animate__animated animate__bounceIn">
                    Lorem rebum magna amet lorem magna erat diam stet. Sadips
                    duo stet amet amet ndiam elitr ipsum diam
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item position-relative" style="height: 430px">
              <img
                class="position-absolute w-100 h-100"
                src="img/carousel-2.jpg"
                style="object-fit: cover"
              />
              <div
                class="carousel-caption d-flex flex-column align-items-center justify-content-center"
              >
                <div class="p-3" style="max-width: 700px">
                  <h1
                    class="display-4 text-white mb-3 animate__animated animate__fadeInDown"
                  >
                    Women Fashion
                  </h1>
                  <p class="mx-md-5 px-5 animate__animated animate__bounceIn">
                    Lorem rebum magna amet lorem magna erat diam stet. Sadips
                    duo stet amet amet ndiam elitr ipsum diam
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item position-relative" style="height: 430px">
              <img
                class="position-absolute w-100 h-100"
                src="img/carousel-3.jpg"
                style="object-fit: cover"
              />
              <div
                class="carousel-caption d-flex flex-column align-items-center justify-content-center"
              >
                <div class="p-3" style="max-width: 700px">
                  <h1
                    class="display-4 text-white mb-3 animate__animated animate__fadeInDown"
                  >
                    Kids Fashion
                  </h1>
                  <p class="mx-md-5 px-5 animate__animated animate__bounceIn">
                    Lorem rebum magna amet lorem magna erat diam stet. Sadips
                    duo stet amet amet ndiam elitr ipsum diam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="product-offer mb-30" style="height: 200px">
          <img class="img-fluid" src="img/offer-1.jpg" alt="" />
          <div class="offer-text">
            <h6 class="text-white text-uppercase">Save 20%</h6>
            <h3 class="text-white mb-3">Special Offer</h3>
            <a href="#products" class="btn btn-primary">Shop Now</a>
          </div>
        </div>
        <div class="product-offer mb-30" style="height: 200px">
          <img class="img-fluid" src="img/offer-2.jpg" alt="" />
          <div class="offer-text">
            <h6 class="text-white text-uppercase">Save 20%</h6>
            <h3 class="text-white mb-3">Special Offer</h3>
            <a href="#products" class="btn btn-primary">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Carousel End -->
  <!-- Featured Start -->

  <!-- Featured End -->

  <!-- Categories Start -->
  <Category />

  <!-- Categories End -->
  <!-- Products Start -->
  <!-- <Products /> -->

  <!-- Products End -->

  <!-- Offer Start -->
  <div class="container-fluid pt-5 pb-3">
    <div class="row px-xl-5">
      <div class="col-md-6">
        <div class="product-offer mb-30" style="height: 300px">
          <img class="img-fluid" src="img/offer-1.jpg" alt="" />

          <div class="offer-text">
            <h6 class="text-white text-uppercase">Save 20%</h6>
            <h3 class="text-white mb-3">Special Offer</h3>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="product-offer mb-30" style="height: 300px">
          <img class="img-fluid" src="img/offer-2.jpg" alt="" />
          <div class="offer-text">
            <h6 class="text-white text-uppercase">Save 20%</h6>
            <h3 class="text-white mb-3">Special Offer</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Offer End -->
  <Footer />
</template>
<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import Products from "./Products.vue";
import Category from "./Category.vue";

export default {
  components: {
    Category,
    Products,
    Navbar,
    Footer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const products = ref([]);
    // const categories = ref([]);
    const searchTerm = ref("");

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/api/category");
      const data = await response.json();
      categories.value = data.categories;
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

    // onMounted(() => {
    //   fetchCategories();
    // });

    return {
      // products,
      // categories,
      searchTerm,
      filterProducts,
      searchProducts,
      // viewProduct,
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
<style>
.product-img img {
  height: 200px;
  width: 300px;
}
.product-item {
  height: 300px;
}
</style>
