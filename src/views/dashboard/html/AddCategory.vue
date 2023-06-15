<template>
    <AdminSidebar/>
    <section class="home">
      <form class="pl-5 pt-5">
        <div class="pl-5 pt-5">
          <h2>Add New Product</h2>
          <form @submit.prevent="addCategory">
            <div>
              <label for="title">Title:</label>
              <input class="form-control" type="text" id="title" v-model="name">
            </div>
            
           
            
            <div>
              <label for="image">Image:</label>
              <input class="form-control" type="file" id="image" @change="onImageChange">
            </div>
            <br><br>
            <button class="btn btn-dark" type="submit">Add category</button>
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
        name: "",  
        image: null,
      };
    },
   
    methods: {
    
      onImageChange(event) {
        this.image = event.target.files[0];
      },
      addCategory() {
        const userToken = localStorage.getItem("userToken");
        const formData = new FormData();
        formData.append("name", this.name);
        
        formData.append("image", this.image);
  
        fetch("http://localhost:8000/api/category", {
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
              alert("Failed to add category");
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