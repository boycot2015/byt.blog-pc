<template>
  <div class="text-center leading-[60px] w-full border-b border-[--el-border-color]">
    <div class="lg:max-w-[1200px] mx-[auto] flex items-center">
      <el-tabs v-model="activeTab" class="lg:max-w-[1200px] mx-[auto]" @tab-click="onTabClick">
        <el-tab-pane name="index" label="首页" />
        <el-tab-pane name="list" label="列表" />
        <el-tab-pane name="about" label="关于" />
        <el-tab-pane name="demo" label="demo" />
      </el-tabs>
      <div class="hidden md:flex items-center">
        <Dark />
        <el-icon :size="20" class="cursor-pointer ml-[--gap]" @click="toggleSetting">
          <Brush />
        </el-icon>
      </div>
    </div>
    <Setting v-model="showSetting" />
  </div>
</template>

<script setup lang="ts">
import { Brush } from '@element-plus/icons-vue'
import { useToggle } from '@vueuse/core'
import Setting from './settings.vue'

const showSetting = ref(false)
const toggleSetting = useToggle(showSetting)
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
