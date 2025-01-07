<template>
    <el-tabs>
        <el-tab-pane v-for="cate in categories"
        :key="cate.id">
            <template #label>
                <el-tag
                    :type="cate.type"
                    @click="$router.push(`/list?category=${cate.id}`)"
                    >
                    {{ cate.value }}
                    </el-tag>
            </template>
        </el-tab-pane>
    </el-tabs>
  </template>
  
  <script setup>
  const { public: config } = useRuntimeConfig()
  const cateLoading = ref(true)
  const categories = ref([])
  const cateCount = ref(0)
  onMounted(() => {
    $fetch(config.apiBase + '/category/get').then((res) => {
      if (res && res.code === 200) {
        categories.value = res.data[0].filter(el => el.articleNum).map((el, index) => ({
            ...el,
            type: index % 2 ? 'danger' : index % 3 ? 'success' : index % 5 ? 'warning' : 'primary'
        })).reverse()
        cateCount.value = res.data[1]
      }
      cateLoading.value = false
    })
  })
  </script>
  
  <style lang="scss" scoped>
  .el-tag {
    background-color: var(--el-mask-color);
    border: 1px dashed;
  }
  .el-tabs {
    :deep(.el-tabs__header) {
        margin-bottom: 0;
    }
    :deep(.el-tabs__nav-wrap:after) {
        height: 0;
    }
    :deep(.el-tabs__nav-wrap) {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
            margin-top: 3px;
            font-size: 24px;
            color: var(--el-color-primary);
        }
    }
  }
  </style>
  