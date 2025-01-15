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
onMounted(() => {
})
const indexData = ref([[], 0])
const getData = ({ current = 0, pageSize = 10 } = {}) => {
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
  $fetch(config.apiBase + '/article/list', { params: { ...pageData.value, ...query } }).then((data) => {
    indexData.value[0] = [...indexData.value[0], ...data.data[0]]
    pageData.value.total = data.data[1]
    loading.value = false
    pageLoading.value = false
  })
}
getData()
// console.log(indexData.value, 'indexData')
</script>

<template>
  <div v-infinite-scroll="() => getData(pageData)" class="blog-list w-[100%]">
    <el-skeleton :loading="pageLoading" animated>
      <template #template>
        <div
          v-for="(post, index) in 5"
          :key="post.id"
          class="w-[100%] flex mb-[--gap]"
          :style="{ order: index % 2 === 0 ? 1 : 2 }"
        >
          <el-skeleton-item
            variant="image"
            class="rounded-xl"
            style="width: 30%;height: 120px;" />
          <div class="flex-1 ml-[--gap]" :style="{ order: index % 2 === 0 ? 2 : 1 }">
            <el-skeleton-item variant="h3" style="width: 40%;" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" style="width: 60%;" />
          </div>
        </div>
      </template>
      <template #default>
        <div
          v-for="(post, index) in indexData[0]"
          :key="post.id"
          class="w-[100%]"
        >
          <Item :data="post" :index="index" :loading="pageLoading" />
        </div>
        <p v-if="loading&&pageData.pageSize>1" class="text-center">
          数据加载中...
        </p>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>

</style>
