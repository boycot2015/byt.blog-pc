<template>
  <div>
    <footer class="!w-full relative z-9999 text-center dark:text-white">
      <div class="wrap w-full md:w-[1200px] mx-[auto] flex flex-col md:flex-row justify-center items-center">
        <div class="text-center flex-1">
          <p>Designed By {{ websiteConfig.author }}</p>
          <p>Copyright © {{ websiteConfig.copyrightTime }}. All Rights Reserved.</p>
          <a
            href="http://beian.miit.gov.cn"
            class="flex items-center justify-center"
            target="_blank">
            <img :src="websiteConfig.policeImg" class="mr-2" alt="">
            {{ websiteConfig.beian || '粤ICP备18002072号' }}
          </a>
        </div>
        <div class="right text-left">
          <p>
            <i class="icon-github icon" />
            Github:
            <a
              :href="`http://${websiteConfig.gitHub ? websiteConfig.gitHub : 'boycot2015@github.com'}`"
              target="_blank"
              rel="noopener noreferrer"
            >{{ websiteConfig.gitHub || 'boycot2015@github.com' }}
            </a>
          </p>
          <p>
            <i class="icon-email icon" />
            邮箱:
            <span> {{ websiteConfig.email || 'boycot2017@163.com' }}</span>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const websiteConfig = computed(() => ({ ...appConfig }))
</script>
