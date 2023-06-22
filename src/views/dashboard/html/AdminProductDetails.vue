<template>
  <AdminSidebar />

  <!-- Shop Detail Start -->
  <section class="home">
    <div class="container-fluid pb-5">
      <div class="row px-xl-5">
        <div class="col-lg-5 mb-30">
          <div
            id="product-carousel"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner bg-light">
              <div class="carousel-item active">
                <img
                  class="card-img-top"
                  :src="`http://localhost:8000/${product.image}`"
                  alt=""
                />
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
              <div class="text-primary mr-2">
                <!-- <small class="fas fa-star"></small>
              <small class="fas fa-star"></small>
              <small class="fas fa-star"></small>
              <small class="fas fa-star-half-alt"></small>
              <small class="far fa-star"></small> -->
              </div>
            </div>
            <h3 class="font-weight-semi-bold mb-4">{{ product.price }}$</h3>
            <p class="mb-4">
              {{ product.description }}
            </p>
            <div class="d-flex mb-3"></div>
            <div class="d-flex mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Shop Detail End -->
</template>
<script>
import AdminSidebar from "./AdminSidebar.vue";

export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      product: {},
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
};
</script>
<style></style>
