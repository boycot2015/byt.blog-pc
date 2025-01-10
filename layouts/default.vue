<template>
  <div class="dark:bg-black min-h-[100vh] w-full">
    <Header />
    <template v-if="$route.path=='/'">
      <Cover />
      <div class="max-w-[1200px] mx-[auto]">
        <Cate />
      </div>
    </template>
    <div class="w-full max-w-[1200px] mx-[auto] my-[20px] flex flex-col md:flex-row justify-center xl:justify-between">
      <main class="min-h-[300px] w-full dark:text-white px-[--gap] lg:max-w-[860px] xl:max-w-[960px]">
        <slot />
      </main>
      <Aside class="hidden lg:block w-[220px] ml-[--gap]" />
      <el-backtop />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Cover from './components/cover.vue'
import Header from './components/header.vue'
import Aside from './components/aside.vue'
import Footer from './components/footer.vue'
import Cate from './components/cate.vue'
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
