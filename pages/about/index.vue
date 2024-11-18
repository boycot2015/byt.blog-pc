<script setup lang="ts">
useHead({ title: '关于博客' })
definePageMeta({
  layout: false,
})
defineOptions({ name: 'About' })
</script>

<template>
  <div class="blog-index">
    <NuxtLayout name="custom">
      关于博客
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>
