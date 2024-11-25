<template>
  <div class="text-center leading-[60px] w-full border-b border-[--el-border-color]">
    <div class="lg:max-w-[1200px] mx-[auto] px-[--gap] md:px-0 flex items-center">
      <el-image class="h-[40px] rounded-md" :src="appConfig.logo" />
      <el-tabs v-model="activeTab" class="lg:max-w-[1200px] mx-[auto]" @tab-click="onTabClick">
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
const activeTab = useState('activeTab', () => route.name || 'index')
const onTabClick = () => {
  nextTick(() => {
    router.push({ name: activeTab.value })
  })
}
defineOptions({
  name: 'LayoutHeader',
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-wrap:after) {
    height: 0;
}
:deep(.el-tabs__header) {
    margin: 0;
    --el-tabs-header-height: 60px;
}
</style>
