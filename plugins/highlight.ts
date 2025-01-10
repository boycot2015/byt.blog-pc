import Hljs from 'highlight.js'

export default defineNuxtPlugin(async (NuxtApp) => {
  // nuxtApp包含的属性可看文档 https://nuxt.com/docs/guide/going-further/internals

  NuxtApp.vueApp.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
      Hljs.highlightBlock(block)
    })
  })
})
