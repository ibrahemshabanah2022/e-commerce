<template>
  <div>succssesssssss</div>
</template>

<script>
export default {
  mounted() {
    fetch("http://127.0.0.1:8000/api/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
</script>
