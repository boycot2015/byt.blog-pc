<template>
  <aside class="aside-bar w-[100vw] bg-[--el-mask-color] h-[auto] fixed left-0 bottom-0 z-[999]" :class="{ active: show }">
    <el-tabs stretch :tab-position="tabPosition" class="list w-[100vw] relative top-[-40px] left-0">
      <el-tab-pane class="list-item">
        <template #label>
          <el-icon size="30" title="刷新" class="cursor-pointer">
            <Mouse @click="toggleShow(!show)" />
          </el-icon>
        </template>
        <APlayer />
      </el-tab-pane>
    </el-tabs>
  </aside>
</template>

<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import type { TabsInstance } from 'element-plus'
import { Mouse } from '@element-plus/icons-vue'

const [show, toggleShow] = useToggle()
const tabPosition = ref<TabsInstance['tabPosition']>('top')
</script>

<style lang="scss">
    .aside-bar {
        transition: all .3s;
        transform: translateY(404px);
    }
    .aside-bar.active {
        transform: translateY(0);
    }
</style>
