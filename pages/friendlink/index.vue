<template>
  <NuxtLayout name="custom">
    <el-row class="friendlink" :gutter="10">
      <el-col
        v-for="item in links"
        :key="item.url"
        :span="12"
        :md="8"
        :lg="6"
        :xl="4"
        class="mb-[--gap]">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          <el-card shadow="hover">
            <div class="flex flex-col items-center">
              <el-image class="rounded-full w-[40px] h-[40px]" :src="item.avatar||('https://avatar.iran.liara.run/public?timestamp='+new Date().getTime())" />
              <div class="flex flex-col">
                <el-text class="my-[--gap]">{{ item.name }}</el-text>
                <el-text class="min-h-[30px]">{{ item.nickname }}</el-text>
                <!-- <el-text>{{ item.email }}</el-text> -->
              </div>
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </NuxtLayout>
</template>

<script setup>
const appConfig = useAppConfig()
const { public: baseConfig } = useRuntimeConfig()
const links = ref(appConfig.links)
useHead({ title: '友情链接' })
const { status, data } = await useFetch(baseConfig.apiBase + '/setting/get', {})
if (status.value !== 'pending') {
  const siteConfig = JSON.parse(data.value.data.siteConfig)
  links.value = siteConfig.links.split(',').filter(el => el)
    .map(el => ({
      name: el.trim().split('|')[0],
      url: el.trim().split('|')[1],
      nickname: el.split('|')[2],
    }))
    .filter(el => el.name && el.url)
    .flat()
//   console.log(links.value)
}
definePageMeta({
  layout: false,
})
</script>
