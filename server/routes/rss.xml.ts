// server/routes/rss.ts

import RSS from 'rss'
import { getDescription } from '@/utils/index.js'

export default defineEventHandler(async (event) => {
  // 用try-catch块包住所有东西
  try {
    // 从dev.to获取数据
    const response = await fetch(
      'https://blog-api.boycot.top/article/list')
    // 如果响应不正常，则抛出错误
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    /*
        等待响应.json（）
        api返回一个带有result键的对象，result包含数组中的所有文章
        将结果分配给帖子
        */
    const { data } = await response.json()
    // 创建新的rss 这将是我们的新的page，带有网站标题和url
    const feed = new RSS({
      title: 'Boycot^s 博客',
      site_url: 'https://blog-new.boycot.top/', // 链接到 website/blog
      feed_url: `https://blog-new.boycot.top/rss.xml`, // 链接到 rss feed
    })
    const posts = data?.[0] || []
    // loop over each posts
    for (const post of posts) {
      // 用正确的数据为rss feed添加项目标签
      feed.item({
        title: post.title, // title from post to item title
        url: `https://blog-new.boycot.top/list/${post.id}`, // 文章所在的完整路径
        // description: '', // dev.to APIs不返回描述，如果你有描述，可以在这里添加。
        date: post.createTime, // 帖子创建日期
        categories: [post.category.value],
        description: getDescription(post.content),
      })
    }
    const feedString = feed.xml({ indent: true }) // 这将返回XML作为一个字符串。
    event.node.res.setHeader('content-type', 'text/xml')
    event.node.res.end(feedString) // 发送
  }
  catch (e) {
    // return an error
    return e
  }
})
