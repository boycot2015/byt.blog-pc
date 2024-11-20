<!-- eslint-disable vue/no-v-html -->
<script setup>
import Item from '../list/components/Item.vue'
import Banner from './components/Banner.vue'

const pageLoading = ref(true)
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
const setting = ref({
  banner: JSON.parse(data.value?.setting?.banner || '[]'),
  activity: JSON.parse(data.value?.setting?.activity || '{}'),
  siteConfig: JSON.parse(data.value?.setting?.siteConfig || '{}'),
  theme: JSON.parse(data.value?.setting?.theme || '{}'),
})
// console.log(indexData, 'indexData')
// console.log(setting.value, 'setting')
defineOptions({ name: 'Blog' })
</script>

<template>
  <div class="blog-index">
    <Banner :data="setting.banner" />
    <div v-if="indexData && indexData.newLeast" class="mt-[15px] w-[100%]">
      <div
        v-for="post in indexData.newLeast"
        :key="post.id"
      >
        <Item :data="post" :loading="pageLoading" />
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
