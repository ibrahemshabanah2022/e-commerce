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
            <h3>current category image</h3>
            <img
              :src="`http://localhost:8000/${category.image}`"
              alt=""
              style="width: 250px"
            />
            <br />
            <br />
            <br />
            <h3>New category image</h3>

            <img :src="imageUrl" v-if="imageUrl" alt="" style="width: 250px" />
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
      imageUrl: "",
      name: "",
      image: null,
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

    updatecategory() {
      // const userToken = localStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("image", this.image);

      fetch(`http://localhost:8000/api/category/${this.category.id}`, {
        method: "POST",

        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to home page
            window.location.href = "/Categories";
          } else {
            // Display error message
            alert("Failed to update category");
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
        this.imageUrl = d.image;
      });
  },
};
</script>
<style></style>
