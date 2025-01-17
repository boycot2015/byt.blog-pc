<template>
  <meting-js
    id="60192"
    server="netease"
    type="playlist" />
</template>

<script setup>
const { $Meting } = useNuxtApp()
onMounted(() => {
  if (window.customElements && !window.customElements.get('meting-js')) {
    window.MetingJSElement = $Meting
    window.customElements.define('meting-js', $Meting)
  }
})
</script>
