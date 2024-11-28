<template>
  <div class="text-center sticky z-[999] top-0 leading-[60px] w-full border-b border-[--el-border-color] bg-[--el-bg-color]">
    <div class="lg:max-w-[1200px] mx-[auto] px-[--gap] md:px-0 flex items-center">
      <nuxt-link to="/" class="h-[40px]">
        <el-image class="h-[100%] rounded-md" :src="appConfig.logo" />
      </nuxt-link>
      <el-tabs v-model="activeTab" class="lg:max-w-[1200px] mx-[auto] nav-list" @tab-click="onTabClick">
        <el-tab-pane
          v-for="nav in appConfig.navList.filter(el => !el.meta?.hideInNav)"
          :key="nav.name"
          :name="nav.name"
          :label="nav.meta.title" />
      </el-tabs>
      <div class="hidden md:flex items-center">
        <Dark />
        <el-icon :size="20" class="cursor-pointer ml-[--gap]" @click="toggleSetting()">
          <Brush />
        </el-icon>
      </div>
    </div>
    <client-only>
      <Setting v-model="showSetting" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Brush } from '@element-plus/icons-vue'
import { useToggle } from '@vueuse/core'
import Setting from './settings.vue'

const showSetting = ref(false)
const toggleSetting = useToggle(showSetting)
const appConfig = useAppConfig()
const router = useRouter()
const route = useRoute()
const activeTab = useState('activeTab', () => route.name as string)
const onTabClick = () => {
  nextTick(() => {
    router.push({ name: activeTab.value })
  })
}
watch(route, () => {
  activeTab.value = route.name as string
})
defineOptions({
  name: 'LayoutHeader',
})
</script>

<style lang="scss" scoped>
:deep(.nav-list .el-tabs__nav-wrap:after) {
    height: 0;
}
:deep(.nav-list .el-tabs__header) {
    margin: 0;
    --el-tabs-header-height: 60px;
}
</style>
