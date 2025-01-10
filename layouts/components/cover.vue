<template>
  <div class="dark:bg-black h-[100vh] w-full flex flex-col items-center justify-center">
    <h1 class="text-[42px] md:text-[64px] text">
      {{ config.title }}
    </h1>
    <Writer class="h-[42px] text-[18px] md:text-[24px] text-center mt-[--gap] text" />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import Writer from '@/components/Writer/index.vue'

const isDark = useDark()
const color = computed(() => isDark.value ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)')
const config = useAppConfig()
</script>

<style lang="scss" scoped>
.text {
    user-select: none;
    text-shadow: 5px 5px 20px v-bind(color);
}
</style>

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
