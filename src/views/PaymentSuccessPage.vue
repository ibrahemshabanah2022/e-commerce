<template>
  <div>succssesssssss</div>
</template>

<script>
export default {
  mounted() {
    fetch("https://e-commerce-api-production-1c29.up.railway.app/api/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
</script>
