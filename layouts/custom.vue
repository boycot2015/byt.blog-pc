<template>
  <div>
    <Header />
    <div class="max-w-[1200px] text-center mx-[auto] my-[20px] min-h-[38rem]">
      <slot />
      <el-backtop />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Footer from './components/footer.vue'
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-30px);
  }
</style>
