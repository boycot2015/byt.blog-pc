// https://nuxt.com/docs/api/configuration/nuxt-config
import { baseUrl, apiUrl } from './api/baseUrl'

export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
  ],
  plugins: [
    {
      src: '~/plugins/wang-editor',
      mode: 'client',
    },
  ],
  ssr: true,
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      // titleTemplate: '%s | 博客',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [{
        src: 'https://cdn.bootcdn.net/ajax/libs/skycons/1396634940/skycons.min.js',
      }],
    },
    // pageTransition: {
    //   name: 'fade',
    //   mode: 'out-in', // 默认值
    // },
    // layoutTransition: {
    //   name: 'fade',
    //   mode: 'out-in', // 默认值
    // },
  },
  // '~/assets/scss/vars.scss',
  css: ['element-plus/theme-chalk/dark/css-vars.css', 'element-plus/dist/index.css', '~/assets/css/main.css', '~/assets/scss/index.scss'],
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      apiBase: baseUrl,
      apiUrl: apiUrl,
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge 👋',
    },
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
  hub: {},
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/scss/vars.scss" as *;',
        },
      },
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
