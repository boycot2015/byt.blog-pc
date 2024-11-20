<!-- eslint-disable vue/no-v-html -->
<script setup>
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
</script>

<template>
  <div class="blog-index">
    <NuxtLayout name="custom">
      <div class="about pd20 w-[1000px] mx-[auto] bgf text-left">
        <div class="title text-center mb-[--gap]">
          <h3>关于我</h3>
        </div>
        <div class="bg">
          <el-image
            lazy
            fit="contain"
            src="/images/about.jpg"
            alt=""
            title="程序猿"
          />
        </div>
        <div class="content tl">
          <div class="content-section">
            <p class="desc">
              {{ websiteConfig.description }}
            </p>
            <ul class="list">
              <li v-for="item in websiteConfig.list" :key="item.name" class="list-item flex justify-around">
                <span v-if="item.name" class="name tr">{{ item.name }}:</span>
                <span class="value flex4">{{ item.value }}</span>
                <!-- {{ item.name }}: {{ item.value }} -->
              </li>
            </ul>
          </div>
        </div>
        <div class="my-links ">
          <h3 class="title mb-[--gap]">
            我的作品
          </h3>
          <div class="list flex items-center justify-around">
            <div
              v-for="item in websiteConfig.links"
              :key="item.name"
              class="list-item flex-1"
              :title="item.name"
            >
              <a
                class="list-item-link"
                :target="item.targetType"
                :href="item.url"
                @click="onOpen(item)"
              >
                <div class="img" :style="{ background: `url(${item.imgUrl}) center/cover no-repeat` }">
                  <NuxtImg :src="item.imgUrl" alt="" />
                </div>
                <div class="flex bottom items-center justify-between">
                  <p class="name line-clamp-1 tl" :title="item.name">{{ item.name }}</p>
                  <div v-if="item.tags" class="flex items-center">
                    <el-tag
                      v-for="tag in item.tags"
                      :key="tag"
                      type="primary"
                      size="small"
                    >{{ tag }}</el-tag>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>
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
      display: inline-grid;
      grid-template-columns: auto auto auto auto;
      grid-template-rows: auto auto auto auto;
      grid-gap: 20px;
      &-item {
          font-size: 16px;
          cursor: pointer;
          // border: 1px solid $c-e8;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          overflow: hidden;
          transition: all 0.3s;
          background: $white;
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
              padding: 10px 5px;
              border-top: 1px solid $c-ccc;
              .name {
                  max-width: 100px;
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
