<template>
  <div>
    <!-- type="card"  -->
    <el-carousel :height="'auto'" autoplay indicator-position="outside">
      <el-carousel-item
        v-for="item in data"
        :key="item.url"
        class="rounded-xl overflow-hidden"
        :class="{ '!h-[360px]': isWindowBig, '!h-[auto]': !isWindowBig } "
      >
        <el-image
          :src="item.url"
          fit="cover"
          class="rounded-xl"
          :alt="item.title"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const isWindowBig = ref(false)
onMounted(() => {
  isWindowBig.value = document.body.offsetWidth > 1200
  console.dir(document.body, '123123')
  window.addEventListener('resize', () => {
    isWindowBig.value = document.body.offsetWidth > 1200
  })
})
</script>

<style lang="scss">
.el-carousel__indicator.el-carousel__indicator--horizontal {
  width: 32px;
}
</style>
