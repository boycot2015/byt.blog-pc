<!-- eslint-disable vue/no-v-html -->
<script setup>
import Item from '../list/components/Item.vue'
import Banner from './components/Banner.vue'
// import Cate from './components/cate.vue'

const pageLoading = ref(true)
const setting = useAppConfig()
const { public: config } = useRuntimeConfig()
const { status, data } = await useAsyncData('index-data', async () => {
  const [indexRes, settingRes] = await Promise.all([
    await $fetch(config.apiBase + '/datas'),
    await $fetch(config.apiBase + '/setting/get'),
  ])
  return { data: indexRes.data, setting: settingRes.data }
})
pageLoading.value = status.value === 'pending'
const indexData = ref(data.value?.data)
// console.log(indexData, 'indexData')
// console.log(setting.value, 'setting')
defineOptions({ name: 'Blog' })
useSeoMeta({ title: '首页', description: setting.value?.siteConfig?.gitHub })
</script>

<template>
  <div class="blog-index w-[100%]">
    <!-- <Cate class="sticky top-[80px] z-[999] backdrop-blur-sm" /> -->
    <Banner :data="setting.banner" />
    <div v-if="indexData && indexData.newLeast" class="w-[100%]">
      <div
        v-for="(post, index) in indexData.newLeast"
        :key="post.id"
      >
        <Item :data="post" :index="index" :loading="pageLoading" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
