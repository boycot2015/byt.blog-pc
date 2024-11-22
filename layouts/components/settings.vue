<template>
  <el-drawer v-model="drawer" title="" :size="300">
    <aside>settings</aside>
  </el-drawer>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const drawer = ref(props.visible)
</script>
