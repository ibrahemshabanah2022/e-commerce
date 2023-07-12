<template>
  <section class="home">
    <AdminSidebar />
    <!-- <v-main style="height: 250px"></v-main> -->

    <div class="text">All Users</div>
    <form @submit.prevent="updateProduct">
      <div class="container-fluid d-flex pl-500">
        <div class="row px-xl-5">
          <div class="mb-5">
            <table
              class="table table-light table-borderless table-hover text-center mb-0"
            >
              <thead class="thead-dark">
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>

                  <th>User Role</th>
                  <th>Edit User</th>

                  <th>Remove User</th>
                </tr>
              </thead>
              <tbody class="align-middle" v-for="user in users" :key="user.id">
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>

                  <td>{{ user.role }}</td>
                  <td class="align-middle">
                    <button
                      @click="editProduct(user.id, user)"
                      class="btn btn-sm btn-info"
                    >
                      <i class="fa fa-pencil-square"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    <button
                      @click="deleteUser(user.id)"
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
    </form>
    <!-- <v-main style="height: 250px"></v-main> -->
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
      users: [],
    };
  },
  methods: {
    editProduct(id) {
      this.$router.push(`/EditUser/${id}`);
    },
    deleteUser(id) {
      fetch(`http://localhost:8000/api/deletecustomer/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.users = this.users.filter((user) => user.id !== id);
        });
    },
  },

  mounted() {
    // const userToken = localStorage.getItem("userToken");

    fetch("http://localhost:8000/api/getcustomers", {
      //   headers: {
      //     Authorization: `Bearer ${userToken}`,
      //   },
    })
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
<style>
/* .container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>
