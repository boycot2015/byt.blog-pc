/** 需要进行持久化的数据：把需要持久化的数据放在下面这个对象中，才会持久化，不需要持久化的数据就不用放到这里了。 */

const enduring: { [key: string]: () => Ref<any> } = {
}
// 下面的俩函数在app.vue的onMounted中统一调用，或者在其它情况挂载后单独调用。
/** 把所有指定数据保存到本地存储
 * @param key 要保存的数据名。不填的话就是保存全部（一般不填，统一在页面关闭时保存。如果是特别重要的数据，就时不时单独保存一下即可。）
 */
export const setLocal = (key?: string, func?: any) => {
  if (key) {
    console.log('只保存', key)
    const useKey = 'use' + key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()// 首字母大写，其它全部转小写
    func = func || enduring[useKey]
    if (!func) {
      console.log('没有找到', useKey, '对应的函数')
      return
    }
    localStorage.setItem(key, JSON.stringify(func()))
  }
  else {
    console.log('正在保存全部数据')
    for (const key in enduring) {
      if (Object.prototype.hasOwnProperty.call(enduring, key)) {
        const element: any = enduring[key]
        const setKey = key.toLowerCase().substring(3)// 去掉前面的use ，其它全部转小写
        try {
          localStorage.setItem(setKey, JSON.stringify(element().value))
        }
        catch (error) {
          console.log(`在设置${setKey}的数据时出现错误`, error)
        }
      }
    }
  }
}
/** 从本地存储获取数据到state中 */
export const getLocal = (key?: string) => {
  if (key) {
    const getKey = key.toLowerCase().substring(3) // 去掉前面的use ，其它全部转小写
    // console.log(getKey, '的本地存储数据获取成功', localStorage.getItem(getKey) || '')
    return JSON.parse(localStorage.getItem(getKey) || '{}')
  }
  for (const key in enduring) {
    if (Object.prototype.hasOwnProperty.call(enduring, key)) {
      const element: any = enduring[key]
      const setKey = key.toLowerCase().substring(3)// 去掉前面的use ，其它全部转小写
      try {
        const localData = localStorage.getItem(setKey) || ''
        if (localData) {
          element().value = JSON.parse(localData)
        //   console.log(setKey, '的本地存储数据获取成功', element().value)
        }
      }
      catch (error) {
        console.log(`在获取${setKey}的数据时出现错误`, error)
      }
    }
  }
}
