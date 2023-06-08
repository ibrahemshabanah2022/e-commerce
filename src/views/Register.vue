<template>
  <Navbar />

  <div class="d-flex justify-content-center">
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          placeholder="Password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
