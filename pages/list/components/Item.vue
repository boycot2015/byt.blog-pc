<template>
  <el-skeleton class="mt-[15px]" animated :loading="loading">
    <template #template>
      <div class="flex mb-[15px] w-[100%]">
        <el-skeleton-item variant="image" class="w-[140px] h-[100px] md:w-[240px] md:h-[160px] mr-[--gap]" />
        <div class="flex flex-1 flex-col mt-[10px]">
          <el-skeleton-item variant="h3" style="width: 240px; height: 30px;" />
          <el-skeleton-item variant="text" class="mt-[10px]" style="width: 240px; height: 20px;width: 100%;" />
          <el-skeleton-item variant="text" class="mt-[10px]" style="width: 240px; height: 20px;width: 100%;" />
          <el-skeleton-item variant="text" class="mt-[10px]" style="width: 240px; height: 20px;width: 50%;" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="mt-[15px]">
        <nuxt-link :to="`/list/${data.id}`">
          <div class="flex mb-[--gap] bg-white rounded-md overflow-hidden shadow-xl">
            <el-image :src="data.imgUrl" fit="cover" class="w-[140px] h-[100px] md:w-[240px] md:h-[160px]" />
            <div class="flex-1 ml-[--gap] p-4">
              <div class="title mb-[--gap]">
                {{ data.title }}
              </div>
              <div class="desc line-clamp-2 min-h-[40px]" v-html="data.content" />
            </div>
          </div>
        </nuxt-link>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>
