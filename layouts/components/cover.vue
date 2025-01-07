<template>
    <div class="dark:bg-black h-[100vh] w-full flex flex-col items-center justify-center">
        <h1 class="text-[64px]">{{ config.title }}</h1>
        <Writer class="h-[42px] text-[24px] mt-[--gap]" />
    </div>
</template>

<script setup lang="ts">
import Writer from '@/components/Writer/index.vue'
const config = useAppConfig()
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
  