<template>
  <AdminSidebar />
  <section class="home">
    <div class="text">Products</div>

    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Products</th>
                <th>Products Name</th>

                <th>Price</th>
                <th>Category Name</th>

                <th>View Product</th>
                <th>Edit Product</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody
              class="align-middle"
              v-for="product in products"
              :key="product.id"
            >
              <tr>
                <td class="align-middle">
                  <img :src="product.image" alt="" style="width: 50px" />
                </td>
                <td>{{ product.title }}</td>
                <td class="align-middle">{{ product.price }}$</td>
                <td class="align-middle">{{ product.category.name }}</td>

                <td class="align-middle">
                  <button
                    class="btn btn-sm btn-success"
                    @click="viewProduct(product.id, product)"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <button
                    @click="viewProduct2(product.id, product)"
                    class="btn btn-sm btn-info"
                  >
                    <i class="fa fa-pencil-square"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <button
                    @click="deleteProduct(product.id)"
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
import AdminSidebar from "./AdminSidebar.vue";

export default {
  components: {
    AdminSidebar,
  },
  methods: {
    viewProduct(id) {
      this.$router.push(`/AdminProductDetails/${id}`);
    },

    deleteProduct(id) {
      fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.products = this.products.filter((product) => product.id !== id);
        });
    },
    viewProduct2(id) {
      this.$router.push(`/EditProduct/${id}`);
    },
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    const userToken = localStorage.getItem("userToken");

    fetch("http://localhost:8000/api/adminproducts", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
