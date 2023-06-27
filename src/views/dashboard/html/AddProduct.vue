<template>
  <AdminSidebar />
  <section class="home">
    <form class="pl-5 pt-5">
      <div class="pl-5 pt-5">
        <h2>Add New Product</h2>
        <form @submit.prevent="addProduct">
          <div>
            <label for="title">Title:</label>
            <input
              class="form-control"
              type="text"
              id="title"
              v-model="title"
            />
          </div>
          <div>
            <label for="price">Price:</label>
            <input
              class="form-control"
              type="number"
              id="price"
              v-model="price"
            />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea
              class="form-control"
              id="description"
              v-model="description"
            ></textarea>
          </div>
          <div>
            <label for="category_id">Category:</label>
            <select class="form-control" id="category_id" v-model="category_id">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="image">Image:</label>
            <input
              class="form-control"
              type="file"
              id="image"
              @change="onImageChange"
            />
          </div>
          <br /><br />
          <button class="btn btn-dark" type="submit">Add Product</button>
        </form>
      </div>
    </form>
  </section>
</template>

<script>
import AdminSidebar from "./AdminSidebar.vue";
import fs from "fs";
import https from "https";

export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      title: "",
      price: 0,
      description: "",
      category_id: 0,
      categories: [],
      image: null,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      fetch("http://localhost:8000/api/category")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data.categories;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onImageChange(event) {
      this.image = event.target.files[0];
    },
    addProduct() {
      const userToken = localStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("price", this.price);
      formData.append("description", this.description);
      formData.append("category_id", this.category_id);
      formData.append("image", this.image);

      fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to home page
            window.location.href = "/products";
          } else {
            // Display error message
            alert("Failed to add product");
          }
        })
        .then((response) => response.json())
        .then((data) => {
          // Download image to public/images directory
          // const imageUrl = data.image;
          // const filename = imageUrl.split("/").pop();
          // const filepath = `images/${filename}`;
          // const file = fs.createWriteStream(filepath);
          // https
          //  .get(imageUrl, (response) => {
          //     response.pipe(file);
          //     console.log(`Image ${filename} downloaded successfully`);
          //   })
          //  .on("error", (error) => {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
