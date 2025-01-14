<!-- eslint-disable vue/no-v-html -->
<script setup>
import Item from '../list/components/Item.vue'
import Banner from './components/Banner.vue'
// import Cate from './components/cate.vue'

const pageLoading = ref(true)
const setting = useAppConfig()
const { public: config } = useRuntimeConfig()
// const { status, data } = await useAsyncData('index-data', async () => {
//   const [indexRes, settingRes] = await Promise.all([
//     await $fetch(config.apiBase + '/datas'),
//     await $fetch(config.apiBase + '/setting/get'),
//   ])
//   return { data: indexRes.data, setting: settingRes.data }
// })
const indexData = ref({})
$fetch(config.apiBase + '/datas').then((res) => {
  indexData.value = res.data
  pageLoading.value = false
})
$fetch(config.apiBase + '/setting/get').then((res) => {
  setting.value = res.data
})
// console.log(indexData, 'indexData')
// console.log(setting.value, 'setting')
defineOptions({ name: 'Blog' })
useSeoMeta({ title: '首页', description: setting.value?.siteConfig?.gitHub })
</script>

<template>
  <div class="blog-index w-[100%]">
    <Banner :data="setting.banner" />
    <el-skeleton :loading="pageLoading" animated>
      <template #template>
        <div
          v-for="(post, index) in 4"
          :key="post.id"
          class="w-[100%] flex mt-[--gap]"
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
        <div v-if="indexData && indexData.newLeast" class="w-[100%]">
          <div
            v-for="(post, index) in indexData.newLeast"
            :key="post.id"
          >
            <Item :data="post" :index="index" :loading="pageLoading" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.blog-index {
  width: 100%;
  min-height: 70vh;
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
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: none;
}
</style>
