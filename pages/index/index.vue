<script setup lang="ts">
import Banner from './components/Banner.vue'
</script>

<template>
  <div class="blog-index">
    <Banner />
  </div>
</template>

<style scoped>
.centered {
  width: 100%;
  text-align: center;
}
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: underline;
}
</style>
