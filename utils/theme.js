import { reactive } from 'vue'
import { apiUrl } from '~/api/baseUrl'

const wallpaper = {
  queryByPage() {
    return $fetch(apiUrl + '/wallpaper')
  },
  getCategory() {},

}
export const state = reactive({
  picData: [],
  cateList: [],
  total: 0,
})
const setPicUrl = (source) => {
  return source.map((el, index) => {
    el.odd = Math.floor(index / 4) % 2 === 1
    el.even = (index + 1) % 2 === 0
    if (!el.realUrl) {
      el.realUrl = el.url.replace('w=1080', 'w=1200')
      el.url = el.url.replace('w=1080', 'w=290')
    }
    el.style = {
      'animation-delay': (Math.random() * 3 + 0.1).toFixed(1) + 's',
    }
    return el
  })
}
const setData = (data) => {
  for (const key in data) {
    state[key] = data[key]
    if (key === 'picData') {
      state[key] = setPicUrl(data[key])
    }
  }
}
const setMoreData = (state, data) => {
  state.picData = [...state.picData, ...data.picData]
  state.picData = setPicUrl(state.picData)
  // console.log(state.picData, 'state.picData')
  state.total = data.total
}
export const actions = {
  async getData(params) {
    // const cateList = await wallpaper.getCategory()
    const state = {}
    let newestList = await wallpaper.queryByPage(params)
    // const newestList = await wallpaper.unsplashList(params)
    // console.log(newestList.data, 'list')
    newestList.data.list = newestList.data.list.map(el => ({ ...el, url: el.img }))
    const customCate = [
      {
        category: 'birdpaper',
        hot_tag: [],
        position: '',
        source: 'birdpaper',
        show_name: '小鸟壁纸',
      },
      {
        category: '360',
        hot_tag: [],
        position: '',
        source: '360',
        show_name: '360壁纸',
      },
      {
        category: 'bing',
        hot_tag: [],
        position: '',
        source: 'bing',
        show_name: 'bing壁纸',
      },
    ]
    state.cateList = [{
      category: '默认',
      hot_tag: [],
      source: 'default',
      position: '',
      show_name: '默认',
    },
    // ...cateList.data || [],
    ...customCate]
    state.picData = newestList.data.list
    state.total = newestList.data.total_count
    setData(state)
    return Promise.resolve({ code: 200, data: state, success: true })
  },
  async getListByCategory(params) {
    const state = {}
    let newestList = await wallpaper.queryByPage({
      ...params,
      page: params.pageno,
      size: params.count,
    })
    let list = newestList.data.list
    list = list.map(el => ({ ...el, url: el.thumb_img || el.img || el.url }))
    state.picData = list
    state.total = newestList.data.total_count
    setData(state)
    return Promise.resolve({ code: 200, data: state, success: true })
  },
  async loadingMore(params) {
    const state = {}
    let newestList = await wallpaper.queryByPage({
      ...params,
      page: params.pageno,
      size: params.count,
    })
    let list = newestList.data.list
    list = list.map(el => ({ ...el, url: el.thumb_img || el.img || el.url }))
    state.picData = [...list]
    state.total = newestList.data.total_count
    setMoreData(state)
    return Promise.resolve({ code: 200, data: state, success: true })
  },
}
