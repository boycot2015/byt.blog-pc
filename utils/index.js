import day from 'dayjs'

/**
 * 处理评论递归数量
 */
export const getCommentNum = (val) => {
  let num = 0
  val.map((el) => {
    num += 1
    if (el.children && el.children.length) {
      num += getCommentNum(el.children)
    }
  })
  return num
}
/** js获取富文本中的第一张图片url正则公式
 * @param {Object} str
 */
export const getImgUrl = (str) => {
  // let data = require('../assets/img/pic-error.jpg')
  let data = ''
  if (str && str !== null) {
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
      data = capture
    })
  }
  return data
}
/**
 * 格式化时间戳（秒|毫秒）
 * @param {timestamp} value 时间戳
 * @param {timestamp} fstr 格式， 默认YYYY-MM-DD HH:mm:ss
 */
export const timeFormat = (value, fstr = 'YYYY-MM-DD HH:mm:ss') => {
  value = value.toString()
  if (value) {
    if (value.length === 13) {
      return day(Number(value)).format(fstr)
    }
    return day.unix(Number(value)).format(fstr)
  }
  else {
    return '-'
  }
}
// 本地存储
export const store = {
  state: {},
  getters: () => {
    return this.state
  },
  /**
         * 获取本地存储
         * @param {*} key 存储的键
         */
  get(key) {
    const data = JSON.parse(localStorage.getItem(key))
    if (data != null) {
      if (data.expirse != null && data.expirse < new Date().getTime()) {
        this.remove()
      }
      else {
        return data.value
      }
    }
    return null
  },
  /**
         * 获取本地存储
         * @param {*} key 存储的键名称
         * @param {*} value 值
         * @param {*} time 过期时间，不设置为永久
         */
  set(key, value, time = new Date().getTime() + 24 * 60 * 60 * 1000) {
    const data = { value, expirse: new Date(time).getTime() }
    localStorage.setItem(key, JSON.stringify(data))
  },
  /**
         * 移除本地存储
         * @param {*} key 存储的键
         */
  remove(key) {
    window.localStorage.removeItem(key)
  },
  action: {},
  mutations: {},
}
/**
 * zch-2021-06-24
 * 更换主题
 * @param {*} $event 事件
 * @param {*} themeConfig 主题配置
 * @param {*} selector 需要设置主题的dom选择器
 */
export const changeTheme = ($event, themeConfig, selector = 'body') => {
  // const localTheme = store.get('themeConfig')
  // if (localTheme && localTheme !== null) {
  //     themeConfig = { ...JSON.parse(localTheme), ...themeConfig }
  // }
  // const themeClass = document.querySelector(selector).className
  const root = document.querySelector(':root')
  if (root === null) return Promise.resolve(themeConfig)
  // const imagesNameArr = getLocalBgUrls()
  const imagesNameArr = []
  let { themeColor, colors } = getLocalColors(30)
  let bgUrlIndex = (themeConfig && themeConfig.bgUrlIndex) || 0
  const colorIndex = (themeConfig && themeConfig.colorIndex) || 0
  if ($event && $event.target) {
    const className = $event.target.className
    $event && $event.target.classList.add('active')
    setTimeout(() => {
      $event.target.classList = className
    }, 300)
  }
  if (themeConfig && !$event) {
    if (typeof themeConfig === 'string') {
      themeConfig = JSON.parse(themeConfig)
    }
    themeConfig.themeColor = themeConfig.themeColor || themeColor
    themeConfig.colors = themeConfig.colors || colors
    themeConfig.bgUrl && (document.querySelector(selector).style.backgroundImage = `url(${themeConfig.bgUrl})`)
    document.querySelector(selector).classList.add('root', 'theme')
    themeConfig.themeColor && root.setAttribute('style', '--primary-color:' + themeConfig.themeColor.primary)
    themeConfig.bgUrlList = imagesNameArr
    // store.set('themeConfig', JSON.stringify(themeConfig))
    return Promise.resolve(themeConfig)
  }
  root.setAttribute('style', '--primary-color:' + themeColor.primary)
  bgUrlIndex = Math.floor(Math.random() * (imagesNameArr.length - 1))
  const bgUrl = imagesNameArr[bgUrlIndex]
  themeColor = colors[colorIndex]
  themeConfig = { bgUrl, themeColor, bgUrlIndex, bgUrlList: imagesNameArr, colors, colorIndex }
  // store.set('themeConfig', JSON.stringify(themeConfig))
  document.querySelector(selector).style.backgroundImage = `url(${bgUrl})`
  // document.querySelector(selector).classList = themeClass
  return Promise.resolve(themeConfig)
}

// export const getLocalBgUrls = () => {
//     const requireModule = require.context(
//         '../assets/images/bgs/',
//         false,
//         /(\.png|\.jpg|\.jpeg)$/
//     )
//     const imagesNameArr = []
//     const urlsArr = []
//     for (var i = 0; i < requireModule.keys().length; i++) {
//         imagesNameArr.push(requireModule.keys()[i].substr(2, requireModule.keys()[i].length))
//     }
//     imagesNameArr.map(el => {
//         urlsArr.push(require(`../assets/images/bgs/${el}`))
//     })
//     return urlsArr
// }
export const getLocalColors = (count = 28) => {
  // const localColor = store.get('colors')
  // if (localColor && localColor !== null) return store.get('colors')
  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  let bgUrlIndex = 0
  const colorsArr = []
  const getColor = () => {
    const themeColor = {
      primary: '#',
      second: '#',
    }
    for (let index = 0; index < 6; index++) {
      bgUrlIndex = Math.floor(Math.random() * (colors.length - 1))
      themeColor.primary += colors[bgUrlIndex]
      bgUrlIndex = Math.floor(Math.random() * (colors.length - 1))
      themeColor.second += colors[bgUrlIndex]
    }
    return themeColor
  }
  for (let index = 0; index < count; index++) {
    colorsArr.push(getColor())
  }
  return { themeColor: colorsArr[0], colors: colorsArr }
}
export function getIPAddress() {
  const interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
