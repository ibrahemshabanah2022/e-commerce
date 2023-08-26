<template>
  <Navbar />

  <!-- Shop Detail Start -->
  <div class="container-fluid pb-5">
    <div class="row px-xl-5">
      <div class="col-lg-5 mb-30">
        <div id="product-carousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner bg-light">
            <div class="carousel-item active">
              <img class="card-img-top" :src="product.image" alt="" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#product-carousel"
            data-slide="prev"
          >
            <i class="fa fa-2x fa-angle-left text-dark"></i>
          </a>
          <a
            class="carousel-control-next"
            href="#product-carousel"
            data-slide="next"
          >
            <i class="fa fa-2x fa-angle-right text-dark"></i>
          </a>
        </div>
      </div>

      <div class="col-lg-7 h-auto mb-30">
        <div class="h-100 bg-light p-30">
          <h3>{{ product.title }}</h3>
          <div class="d-flex mb-3">
            <div class="text-primary mr-2"></div>
          </div>
          <h3 class="font-weight-semi-bold mb-4">{{ product.price }}$</h3>
          <p class="mb-4">
            {{ product.description }}
          </p>
          <div class="d-flex mb-3"></div>
          <div class="d-flex mb-4"></div>
          <div class="d-flex align-items-center mb-4 pt-2">
            <button
              class="btn px-3"
              v-on:click="showSwal()"
              @click="saveProduct()"
              style="background-color: #f1d333"
            >
              <i class="fa fa-shopping-cart mr-1"></i> Add To Cart
            </button>
          </div>

          <div class="d-flex pt-2">
            <strong class="text-dark mr-2">Share on:</strong>
            <div class="d-inline-flex">
              <a class="text-dark px-2" href="">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-dark px-2" href="">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-dark px-2" href="">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-dark px-2" href="">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row px-xl-5">
        <div class="col">
          <div class="bg-light p-30">
            <div class="nav nav-tabs mb-4">
              <a
                class="nav-item nav-link text-dark active"
                data-toggle="tab"
                href="#tab-pane-1"
                >Description</a
              >

              <a
                class="nav-item nav-link text-dark"
                data-toggle="tab"
                href="#tab-pane-3"
                >Reviews
              </a>
            </div>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab-pane-1">
                <h4 class="mb-3">Product Description</h4>
                <p>
                  {{ product.description }}
                </p>
              </div>

              <div class="tab-pane fade" id="tab-pane-3">
                <div class="row">
                  <div class="col-md-6">
                    <!-- <h4 class="mb-4">1 review for "Product Name"</h4> -->
                    <div class="media mb-4">
                      <div class="media-body">
                        <h6>
                          John Doe<small> - <i>01 Jan 2045</i></small>
                        </h6>
                        <!-- <div class="text-primary mb-2">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                          <i class="far fa-star"></i>
                        </div> -->
                        <p>
                          Diam amet duo labore stet elitr ea clita ipsum, tempor
                          labore accusam ipsum et no at. Kasd diam tempor rebum
                          magna dolores sed sed eirmod ipsum.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <h4 class="mb-4">Leave a review</h4>

                    <!-- <div class="d-flex my-3">
                      <p class="mb-0 mr-2">Your Rating * :</p>
                      <div class="text-primary">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    </div> -->
                    <form>
                      <div class="form-group">
                        <label for="message">Your Review *</label>
                        <form @submit.prevent="createComment">
                          <div>
                            <textarea
                              id="message"
                              cols="30"
                              rows="5"
                              class="form-control"
                              v-model="commentContent"
                            ></textarea>
                          </div>
                          <br />
                          <div>
                            <button class="btn btn-primary px-3" type="submit">
                              Leave Your Review
                            </button>
                          </div>
                        </form>
                        <!-- <textarea
                          id="message"
                          cols="30"
                          rows="5"
                          class="form-control"
                        ></textarea> -->
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Shop Detail End -->
  <Footer />
</template>

<script>
import axios from "axios";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: {},
      commentContent: "",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((d) => {
        this.product = d;
      });
  },
  methods: {
    createComment() {
      const id = this.$route.params.id;

      const userToken = localStorage.getItem("userToken");

      fetch("http://localhost:8000/api/PostComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: this.commentContent,
          product_id: id,
        }),
      })
        // axios
        //   .post("http://localhost:8000/api/PostComment", {
        //     content: this.commentContent,
        //     product_id: id,
        //   })
        .then((response) => {
          console.log(response.data);
          // handle success response
        })
        .catch((error) => {
          console.log(error);
          // handle error response
        });
    },
    showSwal() {
      let productt = JSON.parse(localStorage.getItem("product")) || [];
      const tIndex = productt.findIndex((p) => p.id === this.product.id);
      if (tIndex === -1) {
        this.$store.commit("updateCartCount", 1);
      } else {
        this.$store.commit("updateCartCount", 0);
      }
    },
    saveProduct() {
      // Get existing products from local storage or create an empty array
      let products = JSON.parse(localStorage.getItem("product")) || [];

      // Check if the product is already in the cart
      const productIndex = products.findIndex((p) => p.id === this.product.id);
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        window.location.href = "/login";
        return;
      } else {
        if (productIndex === -1) {
          // If the product is not in the cart, add it to the array
          products.push(this.product);

          // Save the updated array to local storage
          localStorage.setItem("product", JSON.stringify(products));
        } else {
          // If the product is already in the cart, do nothing
          alert("Product already in cart");
        }
      }
    },
  },
};
</script>
