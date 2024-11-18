<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <!-- <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,  maximum-scale=1.0,minimum-scale=1.0"> -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Home', description: 'Welcome to the Nuxt 3 starter template' })
</script>

<style>
html,body {
  width: 100%;
}
</style>
