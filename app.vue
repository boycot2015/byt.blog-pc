<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// const pageLoading = ref(true)
onMounted(() => { // 必须在onMounted的时候才能用local和window
  window.onbeforeunload = () => { // 离开页面时保存数据，由于可能突发情况，所以重要数据请手动调用setLocal函数
    setLocal('appdata', useAppConfig) // 如果需要调试本地存储数据，记得把这个注释一下
  }
})
</script>

<style>
html,body {
  width: 100%;
}
</style>
