<template>
  <Transition name="slide-fade">
    <nuxt-link :to="`/list/${data.id}`">
      <div class="flex mb-[--gap] rounded-xl overflow-hidden transition-all duration-[500ms] hover:translate-y-[-5px] hover:drop-shadow-xl shadow-xl bg-[--el-mask-color] border border-[--el-border-color] justify-between">
        <el-image
          v-if="data.img || data.imgUrl || (data.content?getImgUrl(data.content):'')"
          lazy
          :style="{ order: index % 2 === 0 ? 1 : 2 }"
          :src="data.img || data.imgUrl || (data.content?getImgUrl(data.content):'')"
          fit="cover"
          class="w-[180px] h-[160px]" />
        <div class="flex-1 ml-[--gap] p-4 max-w-[100%] max-h-[160px]" :style="{ order: index % 2 === 0 ? 2 : 1 }">
          <div class="title line-clamp-1 text-[16px]">
            {{ data.title }}
          </div>
          <!-- <div v-if="data.content" class="desc text-[14px] text-justify text-wrap line-clamp-4 min-h-[40px]" v-html="data.content.replace(getImgUrl(data.content), '')" /> -->
          <Editor
            v-if="data.content"
            v-model="content"
            class="desc text-[14px] text-justify text-wrap line-clamp-4 min-h-[40px]"
            disabled />
        </div>
      </div>
    </nuxt-link>
  </Transition>
</template>

<script setup>
import { getImgUrl } from '@/utils'
import Editor from '@/components/Editor/index'

const props = defineProps({
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
const content = computed(() => props.data.content?.replace(getImgUrl(props.data.content), ''))
</script>

<style lang="scss" scoped>
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
:deep(.md-editor-dark),
:deep(.md-editor-modal-container[data-theme='dark']) {
  background-color: transparent !important;
  margin-right: 0;
}
:deep(.md-editor-preview-wrapper) {
  padding: 0!important;
}
</style>
