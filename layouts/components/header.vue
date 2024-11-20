<template>
  <div class="text-center border-b dark:border-[#333] leading-[60px] w-full">
    <div class="lg:max-w-[1200px] mx-[auto] flex items-center">
      <el-tabs v-model="activeTab" class="lg:max-w-[1200px] mx-[auto]" @tab-click="onTabClick">
        <el-tab-pane name="index" label="首页" />
        <el-tab-pane name="list" label="列表" />
        <el-tab-pane name="about" label="关于" />
        <el-tab-pane name="demo" label="demo" />
      </el-tabs>
      <div class="hidden md:block">
        <el-icon :size="24" class="cursor-pointer">
          <Setting />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'

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
