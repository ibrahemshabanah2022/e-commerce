<template>
  <Navbar />

  <!-- Breadcrumb Start -->
  <div class="container-fluid">
    <div class="row px-xl-5">
      <div class="col-12">
        <nav class="breadcrumb bg-light mb-30">
          <a class="breadcrumb-item text-dark">Categories</a>

          <a class="breadcrumb-item text-dark">{{ categoryName }}</a>
        </nav>
      </div>
    </div>
  </div>
  <!-- Breadcrumb End -->

  <v-text-field class="" v-model="search" label="Search"> </v-text-field>

  <!-- Shop Start -->
  <div class="container-fluid">
    <div class="row px-xl-5">
      <!-- Shop Sidebar Start -->
      <div class="col-lg-3 col-md-4">
        <!-- Price Start -->
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="pr-3" style="background-color: #f5f5f5"
            >Filter by price</span
          >
        </h5>
        <div class="bg-light p-4 mb-30">
          <div
            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
          >
            <input
              class="border"
              type="number"
              v-model="minPrice"
              placeholder="Minimum Price"
            />
            <!-- @input="filterProducts" -->

            <span class="badge border font-weight-normal">min</span>
          </div>
          <div
            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
          >
            <input
              class="border"
              type="number"
              v-model="maxPrice"
              placeholder="Maximum Price"
            />

            <span class="badge border font-weight-normal">max</span>
          </div>
          <v-btn
            class="btn btn-outline-secondary bg-warning text-dark"
            @click="filterProducts()"
          >
            Filter
          </v-btn>
        </div>
        <!-- Price End -->
      </div>
      <!-- Shop Sidebar End -->

      <!-- Shop Product Start -->
      <div class="col-lg-9 col-md-8">
        <div class="row pb-3">
          <div
            class="col-lg-4 col-md-6 col-sm-6 pb-1"
            v-for="product in filterdItems"
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
                <li class="page-item">
                  <a
                    v-if="links.previous"
                    @click.prevent="fetchProducts(links.previous)"
                    class="page-link"
                    >Previous
                  </a>
                </li>
                &nbsp;
                <li class="page-item">
                  <a
                    v-if="links.next"
                    @click.prevent="fetchProducts(links.next)"
                    class="page-link"
                    >Next
                  </a>
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
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
export default {
  components: {
    Navbar,
    Footer,
  },
  props: {
    initialUrl: {
      type: String,
      default: "http://localhost:8000/api/products",
    },
  },

  data() {
    return {
      products: [],

      categoryName: "",
      minPrice: 0,
      maxPrice: 0,
      search: "",
      links: {},
    };
  },
  computed: {
    filterdItems: function () {
      return this.products.filter((filteredProductsItems) => {
        return filteredProductsItems.title.toLowerCase().match(this.search);
      });
    },
  },
  methods: {
    fetchProducts(url) {
      const categoryId = localStorage.getItem("categoryId");
      const page = url ? url.split("page=")[1] : 1;
      const urlll = `http://localhost:8000/api/getProductByCategory?category_id=${categoryId}&page=${page}`;
      axios
        .get(urlll)
        .then((response) => {
          this.products = response.data.ProductByCategory;
          this.categoryName = response.data.getCategory[0].name;
          this.links = response.data.links;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ///////////////////////
    filterProducts() {
      const id = localStorage.getItem("categoryId");

      // const id = this.$route.params.id;
      const params = new URLSearchParams();
      const { minPrice, maxPrice } = this;
      params.append("category_id", id);

      axios
        .get(
          `http://127.0.0.1:8000/api/filterProductsBYprice?min_price=${minPrice}&max_price=${maxPrice}&category_id=${id}`
        )
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
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
    async addToCart(product) {
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

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/cart/addproduct",
            {
              product_id: product.id,
              // cart_id: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    async addToWishlist(product) {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        window.location.href = "/login";
        return;
      } else {
        let products =
          JSON.parse(localStorage.getItem("wishlistProducts")) || [];

        // Check if the product is already in the wishlist
        const productIndex = products.findIndex((p) => p.id === product.id);

        if (productIndex === -1) {
          // If the product is not in the wishlist, add it to the array
          products.push(product);

          // Save the updated array to local storage
          localStorage.setItem("wishlistProducts", JSON.stringify(products));
          alert("Product added to wishlist");
        } else {
          // If the product is already in the wishlist, do nothing
          alert("Product already in wishlist");
        }

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/wishlists",
            {
              product_id: product.id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response.data);
          // Handle the response data here
        } catch (error) {
          console.error(error);
          this.error = "Failed to add product to wishlist";
        }
      }
    },
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  // async mounted() {
  //   const id = localStorage.getItem("categoryId");

  //   // const id = this.$route.params.id;
  //   // this.categoryId = id;
  //   const params = new URLSearchParams();
  //   params.append("category_id", id);

  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/getProductByCategory?" + params.toString(),
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = response.data;
  //     this.products = data.ProductByCategory;
  //     this.categoryId = data.getCategory;
  //     this.categoryName = data.getCategory[0].name;
  //     this.pagination.previous = data.links.previous;
  //     this.pagination.next = data.links.next;
  //   } catch (error) {
  //     console.error(error);
  //     console.log(this.products);
  //   }
  // },
};
</script>
<style></style>
