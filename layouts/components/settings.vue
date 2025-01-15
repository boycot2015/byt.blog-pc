<template>
  <el-drawer v-model="drawer" title="设置" :size="300">
    <el-form
      v-infinite-scroll="loadingMore"
      :infinite-scroll-distance="10"
      class="text-left">
      <!-- <el-tabs v-model="activeTab">
        <el-tab-pane name="theme" label="主题" />
        <el-tab-pane name="base" label="基础配置" />
      </el-tabs> -->
      <template v-if="activeTab === 'theme'">
        <el-form-item label="主题色:">
          <el-color-picker v-model="appConfig.theme.colors.primary" @change="onColorChange" />
        </el-form-item>
        <el-form-item label="点击特效:">
          <el-select v-model="appConfig.theme.effect" @change="$effect[appConfig.theme.effect]()">
            <el-option
              v-for="item in $effect.list"
              :key="item.key"
              :label="item.name"
              :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label-position="top">
          <div class="w-full">
            <div fill class="flex w-full justify-between items-center mb-2">
              <el-text>在线壁纸</el-text>
              <el-text>
                <el-icon size="20" title="刷新" class="cursor-pointer">
                  <Refresh @click="onRefresh" />
                </el-icon>
              </el-text>
            </div>
            <div v-loading="state.pageLoading" class="min-h-[100vh]">
              <el-row :gutter="10">
                <el-col v-for="item in picData" :key="item.url" :span="12">
                  <el-image
                    lazy
                    :src="item.url"
                    class="cursor-pointer rounded-xl"
                    @click="setBg(item)" />
                </el-col>
                <el-col>
                  <p v-if="state.loading" class="text-center flex items-center justify-center">
                    <el-icon class="el-icon-loading mr-2">
                      <Loading />
                    </el-icon>
                    {{ state.loadingText }}
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
      </template>
      <template v-if="activeTab === 'base'">
        <el-form-item
          v-for="(item, key) in labels"
          v-show="appConfig[key]"
          :key="key"
          :label="(labels[key]||key) + ':'">
          <el-input v-model="appConfig[key]" />
        </el-form-item>
      </template>
    </el-form>
    <el-backtop target=".el-drawer__body" />
  </el-drawer>
</template>

<script setup>
import { Refresh, Loading } from '@element-plus/icons-vue'
import { actions } from '@/utils/theme'

const { $effect } = useNuxtApp()
const activeTab = ref('theme')
const labels = {
  title: '标题',
  author: '作者',
  copyrightTime: '时间',
  copyright: '版权',
  email: '邮箱',
  github: 'github',
  beian: '备案',
  beianUrl: '备案地址',
}
const { public: config } = useRuntimeConfig()
// const data = await $fetch(config.apiBase + '/datas')
const setting = await $fetch(config.apiBase + '/setting/get')
const appConfig = useAppConfig()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const drawer = ref(props.visible)

const { loadingMore: getMore, getData } = actions

const picData = ref([])
const state = reactive({
  pageno: 1,
  loadingText: '点击或下拉加载更多 >',
  cateIndex: 'default',
  loading: false,
  pageLoading: true,
  count: 10,
})
const total = ref(0)

getData({ pageno: 1, count: 10 }).then((res) => {
  total.value = res.data.total
  picData.value = res.data.picData || []
  state.pageLoading = false
})
const setBg = (item) => {
  item.url = item.bgUrl || item.url
  appConfig.theme.bgUrl = item.url
  actions.setWallpaper(item)
}
const onRefresh = () => {
  state.pageLoading = true
  picData.value = []
  getData({ pageno: 1, count: 10 }).then((res) => {
    total.value = res.data.total
    picData.value = res.data.picData || []
    state.pageLoading = false
  })
}
const onColorChange = (color) => {
  document.querySelector(':root').style.setProperty('--color-primary', color)
}
const loadingMore = () => {
  state.loadingText = '加载中...'
  if (state.loading) return
  state.pageno++
  state.loading = true
  getMore({
    old_id: state.cateIndex,
    category: state.cateIndex,
    pageno: state.pageno,
    count: state.count,
  }).then((res) => {
    total.value = res.data.total
    picData.value = res.data.picData || []
    // console.log(res.data, 'state.picData')
    state.pageLoading = false
    setTimeout(() => {
      state.loading = false
      state.loadingText = '点击或下拉加载更多 >'
    }, 1000)
  })
}
onMounted(() => {
  console.log('appConfig', appConfig)

  const data = {
    ...appConfig,
    ...setting.data,
    theme: {
      ...appConfig.theme,
      colors: {
        primary: '#409eff',
      },
    },
    ...getLocal('useAppData'),
    banner: JSON.parse(setting.data?.banner || '[]'),
    activity: JSON.parse(setting.data?.activity || '{}'),
    siteConfig: JSON.parse(setting.data?.siteConfig || '{}'),
    links: JSON.parse(setting.data?.siteConfig || '{}').links?.split(',').filter(el => el)
      .map(el => ({
        name: el.trim().split('|')[0],
        url: el.trim().split('|')[1],
        nickname: el.split('|')[2],
      }))
      .filter(el => el.name && el.url)
      .flat() || [],
  }
  Object.assign(appConfig, data)
  onColorChange(data.theme.colors.primary)
  setBg(data.theme)
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 10px;
}
</style>

<style lang="scss">
 .el-drawer__body {
  padding-right: 10px;
}
</style>
