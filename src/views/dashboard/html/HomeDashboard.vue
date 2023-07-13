<template>
  <div>
    <!-- <AddCategory />
    <AddProduct /> -->
    <AdminSidebar />
  </div>
</template>
<script>
import AddCategory from "./AddCategory.vue";
import AddProduct from "./AddProduct.vue";
import AdminSidebar from "./AdminSidebar.vue";
export default {
  components: {
    AddCategory,
    AddProduct,
    AdminSidebar,
  },
};
</script>
