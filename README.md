# nuxt-blog

[English](./README-EN.md) | [中文](./README.md)

个人博客

<a href="https://boycot.top">
<img src="./preview.png" alt="个人博客" />
</a>

## 技术栈

- 服务端渲染框架 - Nuxt3
- mysql
- Vue3
- Vite

## 启动

安装依赖

```bash
# node 16.x
pnpm install
```

创建环境变量 `.env`:

```bash
NUXT_PUBLIC_HELLO_TEXT="Hello world!"
```

## 启动项目

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## 打包生产环境

```bash
pnpm build
```

# 环境部署

## 部署在NuxtHub上

```bash
npx nuxthub deploy
```


## 部署在Vercel边缘服务器上

 安装 `Vercel CLI`
```bash
npm install -g vercel
```

`Vercel` 打包生产环境
```bash
vercel build --prod
```

打开vercel配置环境变量 `preset`
```bash
PRESET=vercel-edge
```

