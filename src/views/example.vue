<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="card mb-4">
          <div class="card-header">Categories</div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              v-for="category in categories"
              :key="category.id"
              @click="filterProducts(category.id)"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card mb-4">
          <div class="card-header">Products</div>
          <div class="card-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search for products"
                v-model="searchTerm"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="searchProducts()"
                >
                  Search
                </button>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4 mb-4"
                v-for="product in products"
                :key="product.id"
              >
                <div class="card h-100">
                  <img class="card-img-top" :src="product.images" alt="" />
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {{ product.price }}
                    </h6>
                    <button
                      class="btn btn-primary"
                      @click="viewProduct(product.id)"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const searchTerm = ref("");

    const fetchProducts = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
      );
      const data = await response.json();
      products.value = data;
    };

    const fetchCategories = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const data = await response.json();
      categories.value = data;
    };

    const filterProducts = async (categoryId) => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      );
      const data = await response.json();
      products.value = data;
    };

    const searchProducts = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?title=${searchTerm.value}`
      );
      const data = await response.json();
      products.value = data;
    };

    const viewProduct = (productId) => {
      // Do something to view the product
    };

    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    return {
      products,
      categories,
      searchTerm,
      filterProducts,
      searchProducts,
      viewProduct,
    };
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
