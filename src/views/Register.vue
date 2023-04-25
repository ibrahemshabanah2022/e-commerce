<template>
  <div>
    <form @submit.prevent="registerUser" v-if="!user">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="firstName" required />

      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="lastName" required />

      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required />

      <button type="submit">Register</button>
    </form>

    <div v-if="user">
      <h2>User Data:</h2>
      <ul>
        <li v-for="(value, key) in user" :key="key">{{ key }}: {{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      age: "",
      user: null,
    };
  },
  methods: {
    async registerUser() {
      const formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("age", this.age);

      try {
        const response = await fetch("https://dummyjson.com/users/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData }),
        });

        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
