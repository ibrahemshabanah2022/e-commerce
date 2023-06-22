<template>
  <AdminSidebar />
  <section class="home">
    <div class="pl-5 pt-5">
      <form @submit.prevent="updateProduct">
        <div class="justify-content-center">
          <div class="row">
            <div class="col">
              <h3>Product Name</h3>
              <input type="text" class="form-control" v-model="product.title" />
            </div>
            <div class="col">
              <h3>Product Price</h3>
              <input
                type="number"
                class="form-control"
                v-model="product.price"
              />
            </div>
          </div>
          <br />
          <br />
          <h3>Product Description</h3>
          <textarea
            class="form-control"
            rows="6"
            v-model="product.description"
          ></textarea>
        </div>
        <br />
        <button class="btn btn-dark" type="submit">Update</button>
      </form>
    </div>
  </section>
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
  methods: {
    updateProduct() {
      fetch(`http://localhost:8000/api/products/${this.product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.product.title,
          price: this.product.price,
          description: this.product.description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle success
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    },
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
