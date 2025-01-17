export default defineAppConfig({
  title: 'Boycot@小站',
  logo: '/images/logo.png',
  author: 'Boycot',
  copyrightTime: new Date().getFullYear(),
  copyright: 'Copyright © Boycot',
  beian: '粤ICP备18002072号',
  policeImg: '/images/icon-police.png',
  siteTime: '2018-06-04',
  navList: [
    {
      path: '/',
      name: 'index',
      exact: true,
      meta: {
        title: '首页',
      },
      query: {
      },
    },
    {
      path: '/list',
      name: 'list',
      meta: {
        title: '列表',
      },
      query: {
        category: '',
        tag: '',
      },
    },
    {
      path: '/article/[id]',
      name: 'articleview',
      meta: {
        title: '列表详情',
        hideInNav: true,
        hideAside: true,
      },
    },
    // {
    //     path: '/micro-app',
    //     name: 'microMusic',
    //     meta: {
    //         title: '音乐鉴赏',
    //         hideAside: true
    //     },
    //     query: {
    //     }
    // },
    {
      path: '/board',
      name: 'board',
      meta: {
        title: '留言板',
        hideInNav: false,
        showBg: true,
        hideAside: true,
      },
      query: {
      },
    },
    {
      path: '/photowall',
      name: 'photowall',
      meta: {
        title: '照片墙',
        showBg: true,
        hideAside: true,
      },
      query: {
      },
    },
    // {
    //     path: '/navigator',
    //     name: 'microNavigator',
    //     meta: {
    //         title: '网站导航',
    //         hideAside: true
    //     },
    //     query: {
    //     }
    // },
    {
      path: '/classes',
      name: 'classes',
      meta: {
        title: '时间轴',
        hideInNav: true,
      },
      query: {
      },
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
        hideAside: true,
      },
      query: {
      },
    },
    {
      path: '/friendlink',
      name: 'friendlink',
      meta: {
        title: '友链',
        hideAside: true,
      },
      query: {
      },
    },
    {
      name: 'turntoward',
      meta: {
        title: '开往',
        hideAside: true,
      },
      query: {
      },
    },
  ],
  theme: {
    dark: true,
    effect: 'clickText',
    colors: {
      primary: '#2dd4bf',
    },
    bgUrl: '/images/top.jpg',
  },
  about: {
    description: `项目技术栈：Nestjs + Node + Nuxtjs + Mysql <br/> 博客功能主要涉及到文章浏览、详情、文章评论几个模块。
        具体支持特性：`,
    list: [{
      name: '文章',
      value: '创建、分类、标签、预览、发布、编辑、访客访问，以及搜索',
    },
    {
      name: '列表',
      value: '创建、预览、发布',
    },
    {
      name: '评论',
      value: '发布、回复（后台审核通过后可显示）',
    },
    {
      name: '用户',
      value: '访客注册、访客授权',
    },
    {
      name: '文件上传',
      value: '支持上传到本地minio服务器',
    },
    {
      name: '系统设置',
      value: '系统标题、页脚、 SEO 配置、以及邮箱配置等',
    },
    {
      name: '图表展示',
      value: '以图表的形式展示最近的访客量和文章发布记录',
    },
    {
      name: '邮件通知',
      value: '收到新评论时，会邮件通知管理员；评论通过后，会邮件通知被评论人',
    },
    ],
    links: [{
      imgUrl: '/images/admin.jpg',
      url: 'https://blog-admin.boycot.top',
      targetType: '_blank',
      tags: ['vite', 'vue3', 'acroDesign'],
      name: '博客后台管理',
    },
    {
      imgUrl: '/images/swagger_logo.jpg',
      url: 'https://blog-api.boycot.top/api-docs/',
      targetType: '_blank',
      tags: ['nestjs', 'mysql'],
      name: '博客后台api文档',
    },
    {
      imgUrl: '/images/swagger_logo.jpg',
      url: 'https://api.boycot.top/api-docs/',
      targetType: '_blank',
      tags: ['nodejs', 'koa2', 'mysql'],
      name: '个人网站api接口文档',
    },
    {
      imgUrl: '/images/yapi_logo.png',
      url: 'https://api-docs.boycot.top',
      targetType: '_blank',
      tags: ['vite', 'vue3'],
      name: 'api-docs平台',
    },
    {
      imgUrl: '/images/music.png',
      url: 'https://music.boycot.top',
      targetType: '_blank',
      tags: ['react', 'vue3'],
      name: '仿网易云音乐',
    },
    {
      imgUrl: '/images/os.jpg',
      url: 'https://os.boycot.top',
      targetType: '_blank',
      tags: ['svelte', 'vercel'],
      name: 'web os',
    },
    {
      imgUrl: '/images/logo.png',
      url: 'https://web-group.boycot.top',
      targetType: '_blank',
      tags: ['astro'],
      name: 'web group',
    },
    ],
  },
  weatherConfig: {
    appid: '47499825',
    appsecret: 'liyLN9Cq',
  },
  weatherIcons: [
    {
      name: '晴',
      value: 'sunny',
    },
    {
      name: '多云',
      value: 'cloudy',
    },
    {
      name: '雨',
      value: 'rain',
    },
    {
      name: '小雨',
      value: 'rain',
    },
    {
      name: '阵雨',
      value: 'cloudy-rain',
    },
    {
      name: '夜间多云',
      value: 'night',
    },
    {
      name: '中雨',
      value: 'middle-rain',
    },
    {
      name: '阵雨转大雨',
      value: 'heavy-rain',
    },
    {
      name: '暴雨',
      value: 'rainstorm',
    },
    {
      name: '雪',
      value: 'snow',
    },
    {
      name: '雷阵雨',
      value: 'thunder',
    },
    {
      name: '阴',
      value: 'overcast',
    },
    {
      name: '多云转阴',
      value: 'cloudy',
    },
    {
      name: '小雨转阴',
      value: 'rain',
    },
  ],
  microApp: {
    // name="micro-music" url="http://192.168.31.107:3008/" baseroute="/micro-music"
    apps: [{
      name: 'micro-music',
      // url: 'http://43.138.211.108:2001',
      url: 'https://music.boycot.top/',
      baseroute: '/micro-music',
    }],
  },
  links: [
    {
      name: 'boycot',
      nickname: '江湖有缘再聚',
      email: 'boycot2017@163.com',
      avatar: 'https://boycot.top/favicon.ico',
      url: 'https://github.com/boycot2015',
    },
    {
      name: 'boycot-visitor',
      nickname: '寒江孤影，江湖故人，相逢何必曾相识。朋友，来了就留个脚印吧。',
      email: 'boycot2017@163.com',
      // avatar: 'https://avatar.iran.liara.run/public',
      url: 'https://baidu.com',
    },
  ],
})
