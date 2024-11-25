<template>
  <div @click="toggleTheme">
    <el-switch
      v-model="showDark"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
    />
  </div>
</template>

<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const showDark = ref(false)

const toggleDark = useToggle(isDark)
const toggleTheme = (event) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark()
    window.localStorage.setItem('theme-appearance', isDark.value ? 'dark' : 'light')
    return
  }
  const transition = document.startViewTransition(async () => {
    toggleDark()
    window.localStorage.setItem('theme-appearance', isDark.value ? 'dark' : 'light')
    return endRadius
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
onMounted(() => {
  showDark.value = window.localStorage.getItem('theme-appearance') === 'dark'
})
defineOptions({
  name: 'DarkMode',
})
</script>

<style lang="scss" scoped>
</style>
