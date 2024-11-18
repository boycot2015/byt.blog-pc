<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Home', description: 'Welcome to the Nuxt 3 starter template' })
</script>

<style>
</style>
