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
        <div>
          <h3>current Product image</h3>
          <img
            :src="`http://localhost:8000/${product.image}`"
            alt=""
            style="width: 250px"
          />
          <br />
          <br />
          <br />
          <h3>New Product image</h3>

          <img :src="imageUrl" v-if="imageUrl" alt="" style="width: 250px" />
          <input
            class="form-control"
            type="file"
            id="image"
            @change="onImageChange"
          />
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
      image: null,
      imageUrl: "",
    };
  },
  methods: {
    onImageChange(event) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.image);
    },
    updateProduct() {
      const formData = new FormData();
      formData.append("title", this.product.title);
      formData.append("price", this.product.price);
      formData.append("description", this.product.description);

      formData.append("image", this.image);
      fetch(`http://localhost:8000/api/products/${this.product.id}`, {
        method: "POST",

        body: formData,
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
