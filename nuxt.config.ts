// https://nuxt.com/docs/api/configuration/nuxt-config
// import prismjs from 'vite-plugin-prismjs'
// import { viteExternalsPlugin } from 'vite-plugin-externals'
import { baseUrl, apiUrl } from './api/baseUrl'

export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxt/eslint',
  ],
  plugins: [
    {
      src: '~/plugins/prism.ts',
      mode: 'client',
    },
  ],
  ssr: true,
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s | Boycot@小站',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [{
        src: 'https://cdn.bootcdn.net/ajax/libs/skycons/1396634940/skycons.min.js',
      },
      // {
      //   src: 'https://cdn.jsdelivr.net/npm/vue@3.5.12/dist/vue.global.min.js',
      // }, {
      //   src: 'https://cdn.jsdelivr.net/npm/element-plus@2.8.7/dist/index.full.min.js',
      // }, {
      //   src: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js',
      // }, {
      //   src: 'https://cdn.jsdelivr.net/npm/md-editor-v3@5.2.1/lib/umd/index.min.js',
      // },
      ],
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/element-plus@2.8.7/dist/index.min.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/md-editor-v3@5.2.1/lib/style.min.css',
        // },
      ],
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in', // 默认值
    },

    // layoutTransition: {
    //   name: 'slide-fade',
    //   mode: 'out-in', // 默认值
    // },
  },
  // '~/assets/scss/vars.scss',
  css: [
    'element-plus/theme-chalk/dark/css-vars.css',
    'element-plus/dist/index.css',
    '~/assets/css/main.css',
    '~/assets/scss/index.scss'],
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      apiBase: baseUrl,
      apiUrl: apiUrl,
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge 👋',
    },
  },
  build: {
    analyze: true,
    // extend(config, ctx) {
    //   // 添加 externals 配置
    //   config.externals = {
    //     // 例如，将 'vue' 标记为外部依赖
    //     vue: 'Vue',
    //     // 如果使用 CDN 加载 axios，也可以将其标记为外部依赖
    //     axios: 'axios',
    //   }
    // },
  },
  routeRules: {
    '/undefined': {
      redirect: '/',
    },
    '/blog-api/**': {
      proxy: 'http://localhost:3000/blog-api/**',
    },
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  nitro: {
    devProxy: {
      '/blog-api': {
        target: 'https://blog-api.boycot.top',
        changeOrigin: true,
      },
    },
  },
  // https://hub.nuxt.com/docs/getting-started/installation#options
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/scss/vars.scss" as *;',
        },
      },
    },
    plugins: [
      // prismjs({
      //   languages: [
      //     'css',
      //     'sass',
      //     'scss',
      //     'javascript',
      //     'js',
      //     'html',
      //     'swift',
      //     'xml',
      //     'typescript',
      //     'dart',
      //     'csharp',
      //     'json',
      //     'sql',
      //     'bash',
      //     'md',
      //     'nginx',
      //     'cpp',
      //     'java',
      //   ],
      //   plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
      //   theme: 'tomorrow',
      //   css: true,
      // }),
      // viteExternalsPlugin({
      //   'vue': 'Vue',
      //   'prismjs': 'Prismjs',
      //   'element-plus': 'ElementPlus',
      //   'md-editor-v3': 'MdEditorV3',
      // }),
    ],
    // ssr: {
    //   external: ['vue', 'prismjs', 'element-plus', 'md-editor-v3'],
    // },
    build: {
      // rollupOptions: {
      // // 不打包依赖
      //   external: ['vue', 'prismjs', 'element-plus', 'md-editor-v3'],
      //   plugins: [
      //     // 不打包依赖映射的对象
      //     viteExternalsPlugin({
      //       'vue': 'Vue',
      //       'prismjs': 'Prismjs',
      //       'element-plus': 'ElementPlus',
      //       'md-editor-v3': 'MdEditorV3',
      //     }),
      //   ],
      // },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  image: {
    dir: 'assets/images',
  },
})
