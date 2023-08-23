<template>
  <div>succssesssssss</div>
</template>

<script>
export default {
  mounted() {
    fetch("http://localhost:8000/api/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
</script>
