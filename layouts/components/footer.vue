<template>
  <div>
    <footer class="!w-full relative z-9999 text-center dark:text-white">
      <div class="wrap w-[1200px] mx-[auto] flex justify-center items-center">
        <div class="text-center flex-1">
          <p>Designed By {{ websiteConfig.author }}</p>
          <p>Copyright © {{ websiteConfig.copyrightTime }}. All Rights Reserved.</p>
          <a
            href="http://beian.miit.gov.cn"
            class="flex items-center justify-center"
            target="_blank"
            @click="toBeian">
            <img src="/images/icon-police.png" alt="">
            粤ICP备18002072号
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
const toBeian = () => {
  window.open('http://beian.miit.gov.cn/')
}
</script>
