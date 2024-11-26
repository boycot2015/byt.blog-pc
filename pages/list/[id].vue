<!-- eslint-disable vue/no-v-html -->
<script setup>
defineOptions({ name: 'Detail' })
const route = useRoute()
const pageLoading = ref(true)
const { public: config } = useRuntimeConfig()
// const { status, data } = await useFetch(config.apiBase + '/article/getById?id=' + route.params.id)
const { status, data } = await useAsyncData('index-data', async () => {
  const [indexRes] = await Promise.all([
    await $fetch(config.apiBase + '/article/getById?id=' + route.params.id),
  ])
  return { data: indexRes.data }
})
onMounted(() => {
  pageLoading.value = status.value === 'pending'
})
const indexData = ref(data.value?.data || {})
// console.log(indexData.value, route.params, 'indexData')
useHead({ title: indexData.value.title || '博客详情' })
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="centered">
    <NuxtLayout name="custom">
      <!-- <NuxtWelcome /> -->
      <div class="flex flex-col justify-start mb-[--gap] text-left">
        <h3 class="self-start flex-2 mb-[--gap]">
          {{ indexData.title }}
        </h3>
        <div class="tags flex-1 flex flex-col md:flex-row justify-between mb-[--gap]">
          <div class="mr-[--gap] mb-[--gap] md:mb-0 flex justify-between">
            分类：<span class="category mr-[--gap]">{{ indexData.category?.value || '--' }}</span>
            <span class="time flex-1 md:hidden text-right">{{ new Date(indexData.updateTime).toLocaleString() }}</span>
          </div>
          <div class="flex-1">
            标签：<el-tag v-for="tag in indexData.tags" :key="tag.value" class="tag  mr-[--gap]">
              {{ tag.value }}
            </el-tag>
          </div>
          <span class="time flex-1 hidden md:block text-right">{{ new Date(indexData.updateTime).toLocaleString() }}</span>
        </div>
      </div>
      <client-only>
        <p class="text-left content text-justify min-h-[100vh]" v-html="indexData.content" />
      </client-only>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.centered {
  width: 100%;
  text-align: center;
}
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: underline;
}
:deep(.content) {
  img {
    max-width: 100% !important;
    margin: 10px auto !important;
  }
}
</style>
