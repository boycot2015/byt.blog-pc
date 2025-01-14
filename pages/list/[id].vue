<!-- eslint-disable vue/no-v-html -->
<script setup>
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/vs.css'
import Editor from '@/components/Editor/index'

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
onMounted(async () => {
  pageLoading.value = status.value === 'pending'
  const { $Prism } = useNuxtApp()
  $Prism.highlightAll()
})
const indexData = ref(data.value?.data || {})
// console.log(indexData.value, route.params, 'indexData')
useHead({ title: indexData.value.title || '博客详情' })
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="desc">
    <NuxtLayout name="custom">
      <!-- <NuxtWelcome /> -->
      <el-card class="flex flex-col justify-start mb-[--gap] text-left backdrop-blur-sm">
        <h2 class="self-start flex-2 mb-[--gap] text-[18px] md:text-[32px]">
          {{ indexData.title }}
        </h2>
        <el-divider border-style="dashed" />
        <div class="tags !text-left flex-1 flex flex-col md:items-center md:flex-row mb-[--gap]">
          <div class="mr-[--gap] mb-[--gap] md:mb-0 flex justify-between">
            分类：<span class="category mr-[--gap]">{{ indexData.category?.value || '--' }}</span>
            <span class="time flex-1 md:hidden text-right">{{ new Date(indexData.createTime).toLocaleString() }}</span>
          </div>
          <div class="flex-1 flex items-center">
            标签：<el-tag
              v-for="tag in indexData.tags"
              :key="tag.value"
              type="primary"
              effect="dark"
              class="tag  mr-[--gap]">
              {{ tag.value }}
            </el-tag>
          </div>
          <span class="time hidden md:block text-right">发布时间：{{ new Date(indexData.createTime).toLocaleString() }}</span>
        </div>
        <client-only>
          <Editor v-model="indexData.content" class="!text-left" disabled />
          <!-- <p class="text-left content text-justify min-h-[500px] lang-js" v-html="indexData.content" /> -->
        </client-only>
      </el-card>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  text-decoration: none;
  font-size: 18px;
}
:deep(.content) {
  img {
    max-width: 100% !important;
    margin: 10px auto !important;
  }
}
</style>
