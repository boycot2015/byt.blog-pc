<!-- eslint-disable vue/no-v-html -->
<script setup>
import Editor from '@/components/Editor/index'

const pageLoading = ref(true)
const mdText = ref('')
const websiteConfig = useAppConfig().about
useHead({ title: '关于博客' })
definePageMeta({
  layout: false,
})
defineOptions({ name: 'About' })
const onOpen = (item) => {
  if (item.targetType === '_blank') {
    window.open(item.url)
    return
  }
  window.location.href = item.url
}
onMounted(() => {
  $fetch('/README.md').then((res) => {
    mdText.value = res
    pageLoading.value = false
  })
})
</script>

<template>
  <div class="blog-about">
    <NuxtLayout name="custom">
      <div class="about pd20 rounded-xl w-[100%] md:max-w-[1200px] mx-[auto] bgf text-left">
        <!-- <div class="title text-center mb-[--gap]">
          <h3>关于</h3>
        </div> -->
        <!-- <div class="bg-[#006263] m-[auto] mb-3">
          <el-image
            lazy
            fit="cover"
            class="img w-[100%] block m-[auto]"
            src="/images/about.gif"
            alt=""
            title="程序猿"
          />
        </div> -->
        <div v-loading="pageLoading" class="content rounded-xl min-h-[60vh] tl">
          <Editor v-model="mdText" disabled />
          <!-- <div class="content-section">
            <p class="desc" v-html="websiteConfig.description" />
            <ul class="list">
              <li v-for="item in websiteConfig.list" :key="item.name" class="list-item flex justify-around">
                <span v-if="item.name" class="name tr">{{ item.name }}:</span>
                <span class="value flex4">{{ item.value }}</span>
              </li>
            </ul>
          </div> -->
        </div>
        <div class="my-links ">
          <h3 class="title mb-[--gap]">
            我的小站
          </h3>
          <el-row class="list" :gutter="16">
            <el-col
              v-for="item in websiteConfig.links"
              :key="item.name"
              :span="12"
              :md="{ span: 6 }"
              :sm="{ span: 8 }"
              :title="item.name"
            >
              <a
                class="list-item mb-[--gap]"
                :target="item.targetType"
                :href="item.url"
                @click="onOpen(item)"
              >
                <el-card body-class="!p-0">
                  <div class="img overflow-hidden m-[auto] text-center">
                    <el-image
                      :src="item.imgUrl"
                      fit="cover"
                      alt=""
                      class="!border-none h-full md:h-[auto]" />
                  </div>
                  <template #footer>
                    <div class="flex bottom items-center justify-between">
                      <client-only>
                        <el-tooltip>
                          <template #content>
                            <div class="!dark:text-[--text-color-white]">
                              {{ item.name }}
                            </div>
                          </template>
                          <p class="name line-clamp-1">{{ item.name }}</p>
                        </el-tooltip>
                      </client-only>
                      <div v-if="item.tags" class="md:flex hidden items-center">
                        <el-tag
                          v-for="tag in item.tags"
                          :key="tag"
                          type="primary"
                          size="small"
                        >{{ tag }}</el-tag>
                      </div>
                    </div>
                  </template>
                </el-card>
              </a>
            </el-col>
          </el-row>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>
.about {
  padding: 15px;
  background-color: var(--el-mask-color);
}
.my-links {
  padding-top: 15px;
  margin-top: 20px;
  border-top: 1px dashed $primary;
  .title {
      font-size: 20px;
      font-weight: 400;
      line-height: 20px;
      height: auto;
      padding-left: 15px;
      position: relative;
      &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          border-radius: 4px;
          background: $primary;
      }
  }
  .list {
      // display: inline-grid;
      // grid-template-columns: auto auto auto auto;
      // grid-template-rows: auto auto auto auto;
      // grid-gap: 20px;
      &-item {
          font-size: 16px;
          cursor: pointer;
          // border: 1px solid $c-e8;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          overflow: hidden;
          transition: all 0.3s;
          &:nth-child(4n) {
              margin-right: 0;
          }
          &:hover {
              z-index: 2;
              transform: translateY(-5px);
              box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
          }
          &-link:hover {
              color: $primary;
          }
          .img {
              width: 100%;
              height: 150px;
              img {
                  height: 100%;
                  opacity: 0;
              }
          }
          .bottom {
              // padding: 10px 5px;
              // border-top: 1px solid $c-ccc;
              .name {
                  max-width: 120px;
              }
              .el-tag {
                  background-color:var(--primary-color);
                  line-height: 18px;
                  + .el-tag {
                      margin-left: 5px;
                  }
              }
          }
      }
  }
}
</style>
