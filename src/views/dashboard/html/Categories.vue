<template>
  <AdminSidebar />
  <MDBTable class="align-middle mb-0 bg-white">
    <thead class="bg-light">
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Status</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">John Doe</p>
              <p class="text-muted mb-0">john.doe@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Software engineer</p>
          <p class="text-muted mb-0">IT department</p>
        </td>
        <td>
          <MDBBadge badge="success" pill class="d-inline">Active</MDBBadge>
        </td>
        <td>Senior</td>
        <td>
          <MDBBtn color="link" size="sm" rounded> Edit </MDBBtn>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">Alex Ray</p>
              <p class="text-muted mb-0">alex.ray@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Consultant</p>
          <p class="text-muted mb-0">Finance</p>
        </td>
        <td>
          <MDBBadge badge="primary" pill class="d-inline">Onboarding</MDBBadge>
        </td>
        <td>Junior</td>
        <td>
          <MDBBtn
            color="link"
            size="sm"
            rounded
            class="fw-bold"
            :ripple="{ color: 'dark' }"
          >
            Edit
          </MDBBtn>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/7.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">Kate Hunington</p>
              <p class="text-muted mb-0">kate.hunington@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Designer</p>
          <p class="text-muted mb-0">UI/UX</p>
        </td>
        <td>
          <MDBBadge badge="warning" pill class="d-inline">Awaiting</MDBBadge>
        </td>
        <td>Senior</td>
        <td>
          <MDBBtn
            color="link"
            size="sm"
            rounded
            class="fw-bold"
            :ripple="{ color: 'dark' }"
          >
            Edit
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
  <!-- <section class="home">
    <div class="text">categories</div>

    <div class="container-fluid">
      <div>
        <div class="mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>img</th>
                <th>Name</th>

                <th>products number</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody
              class="align-middle"
              v-for="category in categories"
              :key="category.id"
            >
              <tr>
                <td class="align-middle">
                  <img :src="category.image" alt="" style="width: 50px" />
                </td>
                <td>{{ category.name }}</td>
                <td>{{ productCounts[category.id] }}</td>
                <td class="align-middle">
                  <button
                    @click="updateProduct(category.id, category)"
                    class="btn btn-sm btn-info"
                  >
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
  </section> -->
</template>

<script>
import AdminSidebar from "./AdminSidebar.vue";

import { MDBTable, MDBBtn, MDBBadge } from "mdb-vue-ui-kit";
export default {
  components: {
    AdminSidebar,
    MDBTable,
    MDBBtn,
    MDBBadge,
  },
  methods: {
    viewProduct(id) {
      this.$router.push(`/AdminProductDetails/${id}`);
    },

    deleteProduct(id) {
      const userToken = localStorage.getItem("userToken");

      fetch(`http://localhost:8000/api/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.categories = this.categories.filter(
            (category) => category.id !== id
          );
        });
    },
    updateProduct(id) {
      this.$router.push(`/EditCategory/${id}`);
    },
  },
  data() {
    return {
      categories: [],
      productCounts: {},
    };
  },
  mounted() {
    const userToken = localStorage.getItem("userToken");

    fetch("http://localhost:8000/api/categoryAdmin", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.categories = data.categories;
        this.productCounts = data.productCounts;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
