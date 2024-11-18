<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const colors = ['#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185']
const appConfig = useAppConfig()
const color = useState('color', () => appConfig.theme?.colors?.primary || colors[Math.floor(Math.random() * colors.length)])
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="centered">
    <NuxtLayout name="custom">
      <h1 :style="{ color }" class="text-[--color-primary]">
        {{ appConfig.title }} - {{ runtimeConfig.public.helloText }}
      </h1>
      <div>
        baseUrl: <NuxtLink :to="runtimeConfig.public.apiBase +'/api-docs'">
          {{ runtimeConfig.public.apiBase }}
        </NuxtLink>
      </div>
      <NuxtLink to="/demo" external>
        refresh
      </NuxtLink>
      <NuxtWelcome />
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.centered {
  width: 100%;
  text-align: center;
}
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: underline;
}
</style>
