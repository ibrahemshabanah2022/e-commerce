<template>
  <Navbar />

  <div class="d-flex justify-content-center">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div class="form-group form-check"></div>
      <button type="submit" class="btn btn-primary">Submit</button
      ><a
        style="margin: 30px"
        class="btn btn-primary"
        href="http://localhost:5174/#/auth/login"
        ><label class="form-check-label">Login as Admin</label></a
      >
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
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("UserRole", data.user.role);
          const userRole = localStorage.getItem("UserRole");
          // const userToken = localStorage.getItem("userToken");

          if (userRole === "admin") {
            alert("Login failed. Please check your credentials and try again.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
