<template>
  <div class="dark:bg-black min-h-[300px] pb-[--gap]">
    <Header @action="(action, val) => { action === 'setting' && toggleSetting() }" />
    <div class="max-w-[1200px] text-center mx-[auto] min-h-[calc(100vh-188px)] md:my-[--gap] mt-0 dark:text-white p-[--gap] md:p-0">
      <slot />
      <el-backtop />
    </div>
    <Footer />
    <Setting v-model="showSetting" />
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Setting from './components/settings.vue'

const [showSetting, toggleSetting] = useToggle()
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
