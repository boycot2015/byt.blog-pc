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
      <div class="flex justify-start mb-[--gap]">
        <h3 class="self-start flex-2 text-left">
          {{ indexData.title }}
        </h3>
        <span class="category flex-1">{{ indexData.category?.value || '--' }}</span>
        <span class="tag flex-1">{{ indexData.tags.map(_ => _.value) }}</span>
        <span class="time flex-1">{{ new Date(indexData.updateTime).toLocaleString() }}</span>
      </div>
      <client-only>
        <p class="text-left" v-html="indexData.content" />
      </client-only>
      <!-- <p>{{ indexData.content }}</p> -->
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
</style>
