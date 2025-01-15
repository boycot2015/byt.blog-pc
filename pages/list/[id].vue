<!-- eslint-disable vue/no-v-html -->
<script setup>
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/vs.css'
import { useDark } from '@vueuse/core'
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
const isDark = useDark()
const color = computed(() => isDark.value ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)')
</script>

<template>
  <div class="desc">
    <NuxtLayout name="custom">
      <div class="hidden md:flex items-center h-[12vh] md:h-[30vh] mb-[--gap]">
        <h2 class="text-[22px] md:text-[32px] title self-end">
          {{ indexData.title }}
        </h2>
      </div>
      <el-card class="flex flex-col justify-start mb-[--gap] text-left backdrop-blur-sm !overflow-visible rounded-xl">
        <template #header>
          <h2 class="self-start block md:hidden flex-2 text-[18px] md:text-[32px]">
            {{ indexData.title }}
          </h2>
          <el-divider class="block md:hidden" border-style="dashed" />
          <div class="tags !text-left flex-1 flex flex-col md:items-center md:flex-row ">
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
        </template>
        <Editor v-model="indexData.content" disabled />
      </el-card>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
:deep(.el-card__body) {
  padding: 0;
  border-radius: var(--border-radius);
}
h2 {
  text-shadow: 5px 5px 20px v-bind(color);
}
@media (min-width: 768px) {
  :deep(.el-card__body) {
    padding: 20px;
  }
}
a {
  text-decoration: none;
  font-size: 18px;
}
:deep(.content) {
  img {
    max-width: 100% !important;
    margin: 0 auto !important;
  }
}
</style>
