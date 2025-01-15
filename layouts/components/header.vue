<template>
  <div class="text-center sticky z-[999] top-0 leading-[60px] w-full px-[--gap]" :style="styles" :class="{ 'backdrop-blur-md': !!styles.opty }">
    <div class="flex md:max-w-[1200px] mx-[auto] px-[--gap] md:px-0 items-center">
      <nuxt-link to="/" class="h-[40px] hidden md:block">
        <el-image class="h-[100%] rounded-xl" :src="appConfig.logo" />
      </nuxt-link>
      <el-tabs v-model="activeTab" class="w-full md:w-[auto] md:max-w-[1200px] md:ml-[auto] mr-[--gap] text-right nav-list" @tab-click="onTabClick">
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
  </div>
</template>

<script setup lang="ts">
import { Brush } from '@element-plus/icons-vue'
import { useToggle, useDark } from '@vueuse/core'

const emit = defineEmits(['action'])
const isDark = useDark()
const [showSetting, toggleSetting] = useToggle()
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
watch(showSetting, (val) => {
  emit('action', 'setting', val)
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
  setStyles(0)
  window.addEventListener('scroll', (e: any) => {
    setStyles(e.target.scrollingElement.scrollTop / document.documentElement.clientHeight)
  })
})
const color = computed(() => isDark.value ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)')
</script>

<style lang="scss" scoped>
:deep(.nav-list .el-tabs__nav-wrap:after) {
    height: 0;
}
:deep(.nav-list .el-tabs__header) {
    margin: 0;
    .el-tabs__item {
      padding-right: var(--gap);
      text-shadow: 1px 1px 5px v-bind(color);
    }
    // --el-tabs-header-height: 30px;
}
</style>
