<template>
  <AdminSidebar />
  <section class="home">
    <div class="pl-5 pt-5">
      <form @submit.prevent="updatecategory">
        <div class="justify-content-center">
          <div class="row">
            <div class="col">
              <h3>category Name</h3>
              <input type="text" class="form-control" v-model="category.name" />
            </div>
            <br /><br />
          </div>
          <br />
          <br />
          <div>
            <h3>category image</h3>

            <img
              :src="`http://localhost:8000/${category.image}`"
              alt=""
              style="width: 250px"
            />
            <input
              class="form-control"
              type="file"
              id="image"
              @change="onImageChange"
            />
          </div>
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
      category: {},

      name: "",
      image: null,
    };
  },
  methods: {
    onImageChange(event) {
      this.category.image = event.target.files[0];
    },

    updatecategory() {
      // const userToken = localStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("name", this.category.name);

      formData.append("image", this.category.image);

      fetch(`http://localhost:8000/api/category/${this.category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to home page
            window.location.href = "/products";
          } else {
            // Display error message
            alert("Failed to add category");
          }
        })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    fetch(`http://localhost:8000/api/category/${id}`)
      .then((response) => response.json())
      .then((d) => {
        this.category = d;
      });
  },
};
</script>
<style></style>
