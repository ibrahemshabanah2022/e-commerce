<template>
  <Navbar />

  <div>
    <h2>My Wishlist</h2>
  </div>
  <!-- ///////////////////////////////////////////////////////// -->
  <div class="col-md-9">
    <div class="mb-4">
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="product in wishlistProducts"
            :key="product.id"
          >
            <div class="product-item bg-light mb-4">
              <div
                class="product-img position-relative overflow-hidden aspect-ratio aspect-ratio-1x1"
              >
                <img
                  class="card-img-top"
                  :src="`http://localhost:8000/${product.image}`"
                  alt=""
                />

                <div class="product-action">
                  <!-- <button @click="addToCart(product)">Add to Cart</button> -->
                  <a
                    @click="removeWishlistProduct(product.id)"
                    class="btn btn-outline-dark btn-square"
                    ><i class="fa fa-trash"></i
                  ></a>
                  <a
                    v-on:click="showSwal(product)"
                    class="btn btn-outline-dark btn-square"
                    @click="addToCart(product)"
                    ><i class="fa fa-shopping-cart"></i
                  ></a>

                  <a
                    class="btn btn-outline-dark btn-square"
                    @click="viewProduct(product.id, product)"
                    ><i class="fa fa-eye"></i
                  ></a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <!-- <p class="card-text">{{ product.description }}</p> -->
                  <h6 class="card-subtitle mb-2 text-muted">
                    {{ product.price }}$
                  </h6>
                  <!-- <button @click="viewProduct(product.id)">
                          View Details
                        </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      wishlistProducts:
        JSON.parse(localStorage.getItem("wishlistProducts")) || [],
    };
  },
  mounted() {
    // Add event listener to update wishlistProducts when it changes in local storage
    window.addEventListener("storage", this.updateWishlistProducts);
  },
  beforeDestroy() {
    // Remove event listener when component is destroyed
    window.removeEventListener("storage", this.updateWishlistProducts);
  },
  methods: {
    removeWishlistProduct(productId) {
      // Remove the product from the wishlistProducts array
      this.wishlistProducts = this.wishlistProducts.filter(
        (item) => item.id !== productId
      );

      // Update the local storage with the new wishlistProducts array
      localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(this.wishlistProducts)
      );

      // 88888888888888888888888888888888888888888888
      const userToken = localStorage.getItem("userToken");

      fetch("http://127.0.0.1:8000/api/destroy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // Product was removed from the cart
            console.log("Product removed from wishlist");
          } else {
            // Error removing product from the cart
            console.log("Error removing product from wishlist");
          }
        })
        .catch((error) => {
          // Error removing product from the cart
          console.log("Error removing product from wishlist:", error);
        });
    },

    updateWishlistProducts(event) {
      if (event.key === "wishlistProducts") {
        this.wishlistProducts = JSON.parse(event.newValue) || [];
      }
    },
    viewProduct(id, product) {
      this.$router.push(`/products/${id}`);
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
  },
};
</script>
