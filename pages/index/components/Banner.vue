<template>
  <div>
    <!-- type="card"  -->
    <el-carousel height="auto" autoplay>
      <el-carousel-item v-for="item in data" :key="item.url" class="!h-[300px]">
        <el-image :src="item.url" fit="cover" :alt="item.title" />
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
</script>
