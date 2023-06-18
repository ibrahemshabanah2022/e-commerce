
<template>

 
    <AdminSidebar/>
        <section class="home">
            <div class="text">categories</div>
    
            <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="  mb-5">
            <table
              class="table table-light table-borderless table-hover text-center mb-0"
            >
              <thead class="thead-dark">
                <tr>
                  <th> img</th>
                  <th> Name</th>
    
                  <th>products number  </th>
                  <th>Edit </th>
                  <th>Remove </th>
                  
                </tr>
              </thead>
              <tbody
                class="align-middle"
                v-for="category in categories"
                :key="category.id"
              >
                <tr>
                  <td class="align-middle">
                    
                    <img :src="`http://localhost:8000/${category.image}`" alt="" style="width: 50px" />
                  </td>
                  <td>{{ category.name }}</td>
                <td>22</td>
                  <td class="align-middle">
                    <button  @click="viewProduct2(product.id, product)"
     class="btn btn-sm btn-info">
                    <i class="fa fa-pencil-square"></i>
                </button>
              
                  </td>
                  <td class="align-middle">
                    <button
                    @click="deleteProduct(category.id)"
                      class="btn btn-sm btn-danger"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
        
    
        </section>
    </template>
    
    <script>
    import AdminSidebar from"./AdminSidebar.vue"
    // document.addEventListener("DOMContentLoaded", () => {
    //   const body = document.querySelector('body');
    //   const sidebar = body.querySelector('nav.sidebar');
    //   const toggle = body.querySelector(".toggle");
    //   const searchBtn = body.querySelector(".search-box");
    //   const modeSwitch = body.querySelector(".toggle-switch");
    //   const modeText = body.querySelector(".mode-text");
    
    //   toggle.addEventListener("click", () => {
    //     sidebar.classList.toggle("close");
    //   });
    
    //   searchBtn.addEventListener("click", () => {
    //     sidebar.classList.remove("close");
    //   });
    
    //   modeSwitch.addEventListener("click", () => {
    //     body.classList.toggle("dark");
    
    //     if (body.classList.contains("dark")) {
    //       modeText.innerText = "Light mode";
    //     } else {
    //       modeText.innerText = "Dark mode";
    //     }
    //   });
    // });
    export default {
        components:{
            AdminSidebar,
        },
        methods:{
         
         viewProduct(id) {
          this.$router.push(`/AdminProductDetails/${id}`);
         },
     
          deleteProduct(id) {
          fetch(`http://localhost:8000/api/category/${id}`, {
            method: 'DELETE',
          })
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              this.categories = this.categories.filter((category) => category.id!== id);
    
            });
        },
            viewProduct2(id) {
          this.$router.push(`/EditProduct/${id}`);
        },
    },
      data() {
        return {
            categories: []
        }
      },
      mounted() {
        const userToken = localStorage.getItem("userToken");
    
        fetch(        "http://localhost:8000/api/category", {
            headers: {
        // Authorization: `Bearer ${userToken}`
      }
        }
     )
         .then(response => response.json())
         .then(data => {
            this.categories = data;
          })
         .catch(error => {
            console.error(error);
          });
      }
    
     
    }
    </script>
    
    <style></style>