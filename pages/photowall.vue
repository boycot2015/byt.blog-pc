<template>
  <NuxtLayout name="custom">
    <div v-loading="state.loading" class="photowall about pd20 bgf">
      <div class="title flexbox-h my-[20px]">
        照片墙
      </div>
      <el-row class="imgs-list clearfix" :style="{ background: `url(${getBgUrl()}) center/cover no-repeat` }">
        <!-- :class="{bgc: Math.floor((Math.random() * picData.length - 1)) === index}"  -->
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
              append-to-body
              :initial-index="index"
              :src="img.url"
              :preview-src-list="[img.realUrl]"
              :style="{ ...img.style }"
              lazy
              alt=""
            />
          </div>
        </el-col>
      </el-row>
      <div v-if="total > picData.length" class="more-btn" @click="loadingMore">
        <i v-if="state.loadingText === '加载中...'" class="el-icon-loading mr10" />
        {{ loadingText }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { actions } from '@/utils/theme'

const { loadingMore: getMore, getData } = actions
const getLightStyle = (row) => {
  // console.log(row, 'row')
  return (row.odd && row.even) || (!row.odd && !row.even)
}
const picData = ref([])
const state = reactive({
  pageno: 1,
  loadingText: '点击或下拉加载更多 >',
  cateIndex: 0,
  loading: true,
  count: 0,
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
getData({ pageno: 1, count: 16 }).then((res) => {
  total.value = res.data.total
  picData.value = res.data.picData || []
  state.loading = false
})
const loadingMore = () => {
  state.pageno++
  state.loadingText = '加载中...'
  getMore({
    old_id: state.cateIndex,
    category: state.cateIndex || 'unsplash',
    pageno: state.pageno,
    count: state.count,
  }).then((res) => {
    total.value = res.data.total
    picData.value = res.data.list || []
    state.loadingText = '点击或下拉加载更多 >'
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
        color: $white;
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
