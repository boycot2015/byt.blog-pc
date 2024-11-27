<template>
  <el-skeleton animated :loading="loading">
    <template #template>
      <div class="flex mb-[15px] w-[100%]">
        <el-skeleton-item variant="image" class="!w-[180px] !h-[120px] !rounded-md mr-[--gap]" />
        <div class="flex flex-1 flex-col">
          <el-skeleton-item variant="h3" style="width: 240px; height: 30px;" />
          <el-skeleton-item variant="text" class="mt-[10px]" style="width: 240px; height: 20px;width: 100%;" />
          <el-skeleton-item variant="text" class="mt-[10px]" style="width: 240px; height: 20px;width: 60%;" />
        </div>
      </div>
    </template>
    <template #default>
      <Transition name="slide-fade">
        <nuxt-link v-if="!loading" :to="`/list/${data.id}`">
          <div class="flex mb-[--gap] rounded-md overflow-hidden transition-all translate-y-[-5px] hover:drop-shadow-xl shadow-xl dark:bg-black border border-[--el-border-color]">
            <el-image
              :class="{ order: index % 2 === 0 ? 2 : 1 }"
              :src="data.img || data.imgUrl || (data.content?getImgUrl(data.content):'')"
              fit="cover"
              class="w-[120px] h-[115px] md:w-[240px] md:h-[160px]" />
            <div class="flex-1 ml-[--gap] p-4 max-w-[60%] md:max-w-[73%] md:max-h-[160px]" :class="{ order: index % 2 === 0 ? 1 : 2 }">
              <div class="title line-clamp-1 text-[16px] mb-[--gap]">
                {{ data.title }}
              </div>
              <div v-if="data.content" class="desc text-[14px] text-justify text-wrap line-clamp-2 md:line-clamp-4 min-h-[40px]" v-html="data.content.replace(getImgUrl(data.content), '')" />
            </div>
          </div>
        </nuxt-link>
      </Transition>
    </template>
  </el-skeleton>
</template>

<script setup>
import { getImgUrl } from '@/utils'

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
