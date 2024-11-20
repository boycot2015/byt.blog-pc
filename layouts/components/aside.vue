<template>
  <div>
    <aside class="sticky top-5 !w-[220px]">
      <el-card class="mb-[--gap]" body-class="dark:bg-black dark:text-white !p-0">
        <template #header>
          <Calendar />
        </template>
        <TimeCanvas
          :width="220"
          :x="10"
          :y="18"
          :height="60"
          :radius="0.7"
          class="dark:bg-black"
        />
      </el-card>
      <el-card class="mb-[--gap]" body-class="dark:bg-black dark:text-white !p-0">
        <WeatherComponent />
      </el-card>
      <el-card v-loading="cateLoading" class="mb-[--gap]" body-class="dark:bg-black dark:text-white !p-0">
        <template #header>
          <div class="flex justify-between">
            <div>
              <span>分类</span><span>({{ cateCount }})</span>
            </div>
            <span><el-icon><More /></el-icon></span>
          </div>
        </template>
        <el-tag
          v-for="cate in categories.slice(0, 7)"
          :key="cate.id"
          size="small"
          class="mr-[5px] mb-[5px]"
          type="primary"
        >
          {{ cate.value }}
        </el-tag>
      </el-card>
      <el-card v-loading="tagLoading" class="mb-[--gap]" body-class="dark:bg-black dark:text-white !p-0">
        <template #header>
          <div class="flex justify-between">
            <div>
              <span>标签</span><span>({{ tagsCount }})</span>
            </div>
            <span><el-icon><More /></el-icon></span>
          </div>
        </template>
        <el-tag
          v-for="tag in tags.slice(0, 7)"
          :key="tag.id"
          size="small"
          class="mr-[5px] mb-[5px]"
          type="primary"
        >
          {{ tag.value }}
        </el-tag>
      </el-card>
    </aside>
  </div>
</template>

<script setup>
import { More } from '@element-plus/icons-vue'

const { public: config } = useRuntimeConfig()
const tags = ref([])
const cateLoading = ref(true)
const tagLoading = ref(true)
const categories = ref([])
const tagsCount = ref(0)
const cateCount = ref(0)
onMounted(() => {
  $fetch(config.apiBase + '/tag/get').then((res) => {
    if (res && res.code === 200) {
      tags.value = res.data[0]
      tagsCount.value = res.data[1]
    }
    tagLoading.value = false
  })
  $fetch(config.apiBase + '/category/get').then((res) => {
    if (res && res.code === 200) {
      categories.value = res.data[0]
      cateCount.value = res.data[1]
    }
    cateLoading.value = false
  })
})
</script>
