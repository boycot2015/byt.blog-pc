<template>
  <div>
    <aside class="sticky top-5 !w-[220px]">
      <el-card class="mb-[--gap]" body-class="dark:text-white !p-[--gap]">
        <template #header>
          <Calendar />
        </template>
        <TimeCanvas
          :width="200"
          :x="0"
          :y="18"
          :height="60"
          :radius="0.6"
          class="dark:bg-black"
        />
      </el-card>
      <el-card class="mb-[--gap] !border-none" body-class="dark:text-white !p-0">
        <WeatherComponent />
      </el-card>
      <el-card v-loading="cateLoading" class="mb-[--gap]" body-class="min-h-[100px] max-h-[140px] overflow-y-auto dark:text-white !p-[--gap]">
        <template #header>
          <div class="flex justify-between">
            <div>
              <span>分类</span><span>({{ cateCount }})</span>
            </div>
            <el-tooltip content="更多">
              <span class="cursor-pointer" @click="$router.push('/list')"><el-icon><More /></el-icon></span>
            </el-tooltip>
          </div>
        </template>
        <div class="flex flex-wrap">
          <el-tag
            v-for="cate in categories"
            :key="cate.id"
            size="small"
            class="mr-[2px] mb-[2px]"
            type="primary"
          >
            {{ cate.value }}
          </el-tag>
        </div>
      </el-card>
      <el-card v-loading="tagLoading" class="mb-[--gap]" body-class="min-h-[100px] max-h-[140px] overflow-y-auto dark:text-white !p-[--gap]">
        <template #header>
          <div class="flex justify-between">
            <div>
              <span>标签</span><span>({{ tagsCount }})</span>
            </div>
            <el-tooltip content="更多">
              <span class="cursor-pointer" @click="$router.push('/list')"><el-icon><More /></el-icon></span>
            </el-tooltip>
          </div>
        </template>
        <el-tag
          v-for="tag in tags"
          :key="tag.id"
          size="small"
          class="mr-[2px] mb-[2px]"
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

<style lang="scss" scoped>
.el-card {
  background-color: transparent;
}
:deep(.el-card__header) {
  padding: 5px var(--gap);
}
</style>
