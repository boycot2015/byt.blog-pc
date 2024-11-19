<script setup>
import Item from './components/Item.vue'

useHead({ title: '博客列表' })
defineOptions({ name: 'List' })
const pageLoading = ref(true)
const loading = ref(true)
const pageData = ref({
  page: 1,
  size: 10,
  total: 0,
})
const { public: config } = useRuntimeConfig()
const { status, data } = await useFetch(config.apiBase + '/article')
onMounted(() => {
  pageLoading.value = status.value === 'pending'
})
const indexData = ref(data.value?.data || {})
pageData.value.total = data.value?.data[1] || 0
const getData = ({ page = 1, size = 10 } = {}) => {
  loading.value = true
  if (pageData.value.total < page * size || !loading.value) {
    loading.value = false
    return
  }
  pageData.value.page += page
  $fetch(config.apiBase + '/article', { params: { current: pageData.value.page, pageSize: size } }).then((data) => {
    indexData.value[0] = [...indexData.value[0], ...data.data[0]]
    pageData.value.total = data.data[1]
    loading.value = false
  })
}
// console.log(indexData.value, 'indexData')
</script>

<template>
  <div v-infinite-scroll="() => getData(pageData)" class="blog-list">
    <div
      v-for="post in indexData[0]"
      :key="post.id"
    >
      <Item :data="post" :loading="pageLoading" />
    </div>
    <p v-if="loading" class="text-center">
      数据加载中...
    </p>
  </div>
</template>

<style scoped>

</style>
