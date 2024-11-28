div<template>
  <div
    v-infinite-scroll="() => loadingMore()"
    :infinite-scroll-distance="100">
    <NuxtLayout name="custom">
      <div
        v-loading="state.pageLoading"
        class="photowall about md:pt-5 min-h-[300px]">
        <div class="title flexbox-h mb-5">
          照片墙
        </div>
        <el-row class="imgs-list rounded-md overflow-hidden" :style="{ background: `url(${getBgUrl()}) center/cover no-repeat` }">
          <el-col
            v-for="(img, index) in picData"
            :key="index"
            :span="12"
            :md="{ span: 6 }"
            class="imgs-list-item fl"
            :class="{ light: getLightStyle(img, index), dark: getDarkStyle(img, index) }"
          >
            <div class="img">
              <el-image
                fit="cover"
                preview-teleported
                append-to-body
                :initial-index="index"
                :src="img.url"
                :preview-src-list="picData.map(el => el.realUrl)"
                :style="{ ...img.style }"
                lazy
                alt=""
              />
            </div>
            <div class="action absolute w-full flex bottom-0 z-[999]">
              <el-button class="flex-1 rounded-none border-l-0 mr-0" @click="onAction(img, 1)">
                设置为壁纸
              </el-button>
              <el-button class="flex-1 rounded-none border-x-0 !ml-0" @click="onAction(img, 2)">
                查看大图
              </el-button>
            </div>
          </el-col>
        </el-row>
        <div class="more-btn mt-[--gap]">
          <div v-if="state.loading" class="flex items-center justify-center">
            <el-icon class="el-icon-loading mr-2">
              <Loading />
            </el-icon>
            {{ state.loadingText }}
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'
import { actions } from '@/utils/theme'

const { loadingMore: getMore, getData } = actions
const getLightStyle = (row) => {
  // console.log(row, 'row')
  return (row.odd && row.even) || (!row.odd && !row.even)
}
const picData = ref([])
const state = reactive({
  pageno: 1,
  loadingText: '加载中...',
  cateIndex: 'default',
  loading: false,
  pageLoading: true,
  count: 16,
})
const total = ref(0)
const getDarkStyle = (row) => {
  // console.log(row, 'row')
  return row.odd && !row.even
}
const getBgUrl = () => {
  const len = picData.value.length
  if (!len) return ''
  const url = picData.value[Math.floor(Math.random() * len)].realUrl
  return url || picData.value[0] || picData.value[0].url || ''
}
const onAction = (row, type) => {
  switch (type) {
    case 1:
      actions.setWallpaper(row)
      break
    case 2:
      window.open(row.url)
      break
    default:
      break
  }
}
getData({ pageno: 1, count: 16 }).then((res) => {
  total.value = res.data.total
  picData.value = res.data.picData || []
  state.pageLoading = false
})
const loadingMore = () => {
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
    }, 200)
  })
}
useHead({ title: '照片墙' })
definePageMeta({
  layout: false,
})
</script>

<style lang='scss' scoped>
.photowall {
    min-height: 700px;
    // background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    &.about .title h3 {
        color: $c-ccc;
    }
    .imgs-list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-size: contain;
        background-position: center;
        background-attachment: fixed;
        .imgs-list-item {
            // box-shadow: 2px 2px 2px #999;
            // display: inline-block;
            // background: $c-333;
            // width: 386px;
            // height: 260px;
            width: 290px;
            // height: 210px;
            height: auto;
            overflow: hidden;
            position: relative;
            .img {
                transform: scale(1);
                height: 100%;
                transition: all .5s .2s;
                .el-image {
                    height: 100%;
                    display: block;
                }
                :deep(img)  {
                    max-width: 100%;
                    height: 100%;
                    transition: all .5s .2s;
                    animation: fadeIn 1.2s both;
                    filter: brightness(0.3);
                }
            }
            &:hover {
                :deep(.img) {
                    transform: scale(1.5);
                    img {
                        filter: brightness(1);
                    }
                }
            }
            &.light {
                :deep(img) {
                    filter: brightness(1);
                    // animation-delay: 1s;
                }
            }
            &.dark {
                :deep(img) {
                    filter: brightness(0.3);
                    // animation-delay: 0.5s;
                }
            }
        }
    }
    .more-btn {
        text-align: center;
        line-height: 32px;
        &:hover {
            color: $primary;
            cursor: pointer;
        }
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
