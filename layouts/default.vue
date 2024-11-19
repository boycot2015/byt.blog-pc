<template>
  <div class="dark:bg-black">
    <Header />
    <div class="md:max-w-[1200px] mx-[auto] my-[20px] flex justify-between">
      <main class="w-[100%] md:w-[960px] min-h-[38rem]">
        <slot />
      </main>
      <Aside class="hidden md:block md:w-[220px] ml-[var(--gap)]" />
      <el-backtop />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Aside from './components/aside.vue'
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
