<script setup>
import Item from './components/Item.vue'

useHead({ title: '博客列表' })
defineOptions({ name: 'List' })
const pageLoading = ref(true)
const { public: config } = useRuntimeConfig()
const { status, data } = await useFetch(config.apiBase + '/article')
onMounted(() => {
  pageLoading.value = status.value === 'pending'
})
const indexData = ref(data.value?.data || {})
// console.log(indexData.value, 'indexData')
</script>

<template>
  <div class="blog-list">
    <div
      v-for="post in indexData[0]"
      :key="post.id"
    >
      <Item :data="post" :loading="pageLoading" />
    </div>
  </div>
</template>

<style scoped>

</style>
