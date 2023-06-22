<template>
  <AdminSidebar />
  <section class="home">
    <div class="pl-5 pt-5">
      <form @submit.prevent="updateuser">
        <div class="justify-content-center">
          <div class="row">
            <div class="col">
              <h3>User Name</h3>
              <input type="text" class="form-control" v-model="user.name" />
            </div>
            <div class="col">
              <h3>User Email</h3>
              <input type="text" class="form-control" v-model="user.email" />
            </div>
            <!-- <div class="col">
              <h3>User Name</h3>
              <input type="text" class="form-control" v-model="user.role" />
            </div> -->
            <div class="col">
              <h3>User Role</h3>
              <div v-if="user.role == 'admin'">
                <select style="width: 200px; height: 35px" v-model="user.role">
                  <option selected>admin</option>
                  <option>user</option>
                </select>
              </div>
              <div v-if="user.role == 'user'">
                <select style="width: 200px; height: 35px" v-model="user.role">
                  <option selected>user</option>
                  <option>admin</option>
                </select>
              </div>
            </div>
          </div>

          <br />
          <br />
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
      user: {},
    };
  },
  methods: {
    updateuser() {
      fetch(`http://localhost:8000/api/updateUser/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle success
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    fetch(`http://localhost:8000/api/showUser/${id}`)
      .then((response) => response.json())
      .then((d) => {
        this.user = d;
      });
  },
};
</script>
<style></style>
