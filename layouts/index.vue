<template>
  <div>
    <NuxtLayout :name="layout">
      <el-tabs v-model="activeTab" @tab-click="onTabClick">
        <el-tab-pane name="index" label="index" />
        <el-tab-pane name="demo" label="demo" />
      </el-tabs>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 可以基于 API 调用或登录状态进行选择
const layout = ref('default')
const router = useRouter()
const route = useRoute()
const activeTab = useState('activeTab', () => route.name || 'index')
const onTabClick = () => {
  nextTick(() => {
    router.push({ name: activeTab.value })
  })
}
</script>

  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-30px);
  }
  </style>
