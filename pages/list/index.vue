<script setup>
import Item from './components/Item.vue'

useHead({ title: '博客列表' })
defineOptions({ name: 'List' })
const pageLoading = ref(true)
const loading = ref(true)
const query = useRoute().query
const pageData = ref({
  current: 1,
  pageSize: 5,
  total: 0,
})
const { public: config } = useRuntimeConfig()
const { status, data } = await useFetch(config.apiBase + '/article/list', {
  method: 'get',
  params: { ...pageData.value, ...query },
})
onMounted(() => {
  pageLoading.value = status.value === 'pending'
})
const indexData = ref(data.value?.data || {})
pageData.value.total = data.value?.data[1] || 0
const getData = ({ current = 1, pageSize = 10 } = {}) => {
  loading.value = true
  if (pageData.value.total < current * pageSize || !loading.value) {
    loading.value = false
    return
  }
  pageData.value = {
    ...pageData.value,
    current: ++current,
    pageSize: pageSize,
  }
  $fetch(config.apiBase + '/article', { params: { ...pageData.value, ...query } }).then((data) => {
    indexData.value[0] = [...indexData.value[0], ...data.data[0]]
    pageData.value.total = data.data[1]
    loading.value = false
  })
}
// console.log(indexData.value, 'indexData')
</script>

<template>
  <div v-infinite-scroll="() => getData(pageData)" class="blog-list w-[100%]">
    <div
      v-for="(post, index) in indexData[0]"
      :key="post.id"
      class="w-[100%]"
    >
      <Item :data="post" :index="index" :loading="pageLoading" />
    </div>
    <p v-if="loading" class="text-center">
      数据加载中...
    </p>
  </div>
</template>

<style scoped>

</style>
