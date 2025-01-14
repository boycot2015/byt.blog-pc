<template>
  <Transition name="slide-fade">
    <nuxt-link :to="`/list/${data.id}`">
      <div class="flex mb-[--gap] rounded-xl overflow-hidden transition-all duration-[500ms] hover:translate-y-[-5px] hover:drop-shadow-xl shadow-xl bg-[--el-mask-color] border border-[--el-border-color] justify-between">
        <el-image
          lazy
          :style="{ order: index % 2 === 0 ? 1 : 2 }"
          :src="data.img || data.imgUrl || (data.content?getImgUrl(data.content):'')"
          fit="cover"
          class="w-[180px] h-[160px]" />
        <div class="flex-1 ml-[--gap] p-4 max-w-[100%] max-h-[160px]" :style="{ order: index % 2 === 0 ? 2 : 1 }">
          <div class="title line-clamp-1 text-[16px] mb-[--gap]">
            {{ data.title }}
          </div>
          <div v-if="data.content" class="desc text-[14px] text-justify text-wrap line-clamp-4 min-h-[40px]" v-html="data.content.replace(getImgUrl(data.content), '')" />
        </div>
      </div>
    </nuxt-link>
  </Transition>
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
