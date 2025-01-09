<template>
  <div class="text-center sticky z-[999] top-0 leading-[60px] w-full" :style="styles" :class="{ 'backdrop-blur-md': !!styles.opty }">
    <div class="lg:max-w-[1200px] mx-[auto] px-[--gap] md:px-0 flex items-center">
      <nuxt-link to="/" class="h-[40px]">
        <el-image class="h-[100%] rounded-xl" :src="appConfig.logo" />
      </nuxt-link>
      <el-tabs v-model="activeTab" class="lg:max-w-[1200px] ml-[auto] mr-4 text-right nav-list" @tab-click="onTabClick">
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
import { useToggle, useDark } from '@vueuse/core'
import Setting from './settings.vue'

const showSetting = ref(false)
const isDark = useDark()
const toggleSetting = useToggle(showSetting)
const appConfig = useAppConfig()
const router = useRouter()
const route = useRoute()
const activeTab = useState('activeTab', () => route.name as string)
const styles = ref({
  backgroundColor: 'rgba(0, 0, 0, 0)',
  opty: 0,
})
const onTabClick = () => {
  nextTick(() => {
    if (activeTab.value === 'turntoward') {
      const { links } = appConfig
      const index: any = Math.floor(Math.random() * links.length) || 0
      window.open(links[index]?.url)
      return
    }
    router.push({ name: activeTab.value })
  })
}
watch(route, () => {
  activeTab.value = route.name as string
})
watch(isDark, () => {
  styles.value = {
    ...styles.value,
    backgroundColor: isDark.value ? `rgba(0, 0, 0, ${styles.value.opty})` : `rgba(255, 255, 255, ${styles.value.opty})`,
  }
})
defineOptions({
  name: 'LayoutHeader',
})
const setStyles = (opty: number) => {
  styles.value = {
    opty,
    backgroundColor: isDark.value ? `rgba(0, 0, 0, ${Math.min(opty, 0.9)})` : `rgba(255, 255, 255, ${Math.min(opty, 0.9)})`,
  }
}
onMounted(() => {
  window.addEventListener('scroll', (e: any) => {
    setStyles(e.target.scrollingElement.scrollTop / document.documentElement.clientHeight)
  })
})
</script>

<style lang="scss" scoped>
:deep(.nav-list .el-tabs__nav-wrap:after) {
    height: 0;
}
:deep(.nav-list .el-tabs__header) {
    margin: 0;
    --el-tabs-header-height: 30px;
}
</style>
