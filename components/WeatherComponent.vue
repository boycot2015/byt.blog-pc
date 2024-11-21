<template>
  <div v-show="state.showWeather" v-loading="loading" class="min-h-[145px]">
    <div
      v-for="weather in state.weathers"
      :key="weather.location"
      class="panels now"
    >
      <!-- @click.stop="showDialog"
      @dblclick.stop="showDialog" -->
      <div v-if="weather && weather.location" class="location">
        {{ weather.location.name }}市
      </div>
      <div v-if="weather && weather.now" class="weather" :style="{ 'font-size': weather.now.text.length > 3 && '28px' }">
        <!-- {{ weather.now.text }} -->
        <el-image class="!bg-[transparent] h-[80px]" :src="'svg/' + icons[weather.now.text] + '.svg'" />
      </div>
      <div v-if="weather && weather.now" class="temperature">
        {{ weather.now.temperature }}℃
      </div>
      <!-- <div v-if="weather && weather.last_update" class="last_update">
        {{ new Date(weather.last_update).toLocaleDateString() }}
      </div> -->
      <!-- <span class="close" @click.stop="showWeather = false">×</span> -->
    </div>
    <div ref="dialogRef" class="dialog-content hidden" :class="state.viewMore && 'active'">
      <div class="dialog-main">
        <div class="top">
          <div class="panels location">
            <div v-if="state.weathers[0] && state.weathers[0].location" class="location">
              {{ state.weathers[0].location.name }}市
            </div>
            <div v-if="state.weathers[0] && state.weathers[0].now" class="weather" :style="{ 'font-size': state.weathers[0].now.text.length > 5 && '34px' }">
              {{ state.weathers[0].now.text }}
            </div>
            <div v-if="state.weathers[0] && state.weathers[0].now" class="temperature">
              {{ state.weathers[0].now.temperature }}℃
            </div>
            <div v-if="state.weathers[0] && state.weathers[0].last_update" class="last_update">
              {{ new Date(state.weathers[0].last_update).toLocaleDateString() }}
            </div>
          </div>
          <div class="panels suggestion">
            <div v-for="item in state.life.suggestion" :key="item.brief" class="item">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="cont">
                {{ item.details || item.brief }}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div v-if="state.dailyWeather.location" class="title">
            {{ state.dailyWeather.location.name }}市最近3天天气情况
          </div>
          <div class="list">
            <div
              v-for="weather in state.dailyWeather.daily"
              :key="weather.location"
              class="panels"
              @dblclick="showDialog"
            >
              <div v-if="weather && weather.text_day" class="weather" :style="{ 'font-size': weather.text_day.length > 3 && '28px' }">
                {{ weather.text_day }}
              </div>
              <div v-if="weather && weather.high" class="temperature">
                {{ weather.low }}~{{ weather.high }}℃
              </div>
              <div v-if="weather && weather.wind_direction" class="wind">
                {{ weather.wind_direction }}/{{ weather.wind_scale }}级
              </div>
              <div v-if="weather && weather.date" class="last_update">
                {{ new Date(weather.date).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="add-city" @click="addCity()">+</div> -->
  </div>
</template>

<script>
</script>

<script setup>
// import axios from '@/api/axios'
import { apiUrl } from '@/api/baseUrl'

const icons = ref({
  阴: 'cloud',
  小雨: 'rain',
  晴: 'sunny',
  多云: 'cloudy',
})
const initSkycons = (text) => {
  const icons = {
    阴: 'PARTLY_CLOUDY_DAY',
    小雨: 'RAIN',
  }

  const skycons = new window.Skycons({ color: 'black' })
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add('weather-icon', window.Skycons[icons[text]])

  // ...or by the canvas DOM element itself.
  // skycons.add(document.getElementById('icon2'), Skycons.RAIN)

  // if you're using the Forecast API, you can also supply
  // strings: "partly-cloudy-day" or "rain".

  // start animation!
  skycons.play()

  // you can also halt animation with skycons.pause()

  // want to change the icon? no problem:
  skycons.set('weather-icon', window.Skycons[icons[text]])

  // want to remove one altogether? no problem:
  // skycons.remove('icon2')
}

const state = reactive({
  weathers: [],
  dailyWeather: {},
  showWeather: true,
  viewMore: false,
  life: {
    location: {
      id: 'WS10730EM8EV',
      name: '深圳',
      country: 'CN',
      path: '深圳,深圳,广东,中国',
      timezone: 'Asia/Shanghai',
      timezone_offset: '+08:00',
    },
    suggestion: {
      dressing: {
        brief: '炎热',
        title: '穿衣',
        details: '',
      },
      flu: {
        brief: '少发',
        title: '感冒',
        details: '',
      },
      sport: {
        brief: '较不宜',
        title: '运动',
        details: '',
      },
      travel: {
        brief: '较适宜',
        title: '旅游',
        details: '',
      },
      uv: {
        brief: '中等',
        title: '紫外线',
        details: '',
      },
      car_washing: {
        brief: '不宜',
        title: '洗车',
        details: '',
      },
    },
    last_update: '2021-08-18T18:21:42+08:00',
  },
})
const dialogRef = ref(null)
const loading = ref(true)
// const MessageBox = inject('messageBox')
const location = '深圳'
const showDialog = () => {
  state.viewMore = false
  state.showWeather = false
  // MessageBox({
  //   content: dialogRef.value.innerHTML,
  //   shadeClose: false,
  //   title: '',
  //   drag: true,
  //   layerStyle: {
  //     width: '800px',
  //     height: '500px',
  //     borderRadius: '15px',
  //     padding: '20px 0 0 0',
  //     background: 'rgba(0,0,0,0.8)',
  //   },
  //   btns: [
  //     // { text: '取消', click: () => { $el.close() } },
  //     // { text: '确认', class: 'btn-primary', click: () => { $el.close() } }
  //   ],
  // })
}
onMounted(() => {
  initData()
  initNow()
  setInterval(() => {
    initData()
  }, 30 * 60 * 1000)
  setInterval(() => {
    initNow()
  }, 15 * 1000)
})
const initNow = () => {
  $fetch(`${apiUrl}/weather`, { params: { location } })
    .then((res) => {
      loading.value = false
      if (!res.success) return
      state.weathers = [res.data]
      initSkycons(state.weathers[0].now.text)
    })
}
const initData = () => {
  $fetch(`${apiUrl}/weather/daily`, { params: { location } })
    .then((res) => {
      if (!res.success) return
      state.dailyWeather = res.data
      state.dailyWeather.daily = res.data.daily.map((el) => {
        return {
          ...el,
          wind_direction: !el.wind_direction.includes('风') ? el.wind_direction + '风' : el.wind_direction,
        }
      })
    })
  $fetch(`${apiUrl}/weather/life`, { params: { location } })
    .then((res) => {
      if (!res.success) return
      state.life.location = res.data.location
      for (const key in res.data.suggestion) {
        if (res.data.suggestion[key]) {
          state.life.location[key] = res.data.suggestion[key]
        }
      }
    })
}
defineOptions({
  name: 'WeatherComponent',
})
</script>

<style lang="scss" scoped>
.weather-component {
    font-size: 12px;
    width: 180px;
    height: 160px;
    display: flex;
    position: fixed;
    z-index: 10;
    left: 50px;
    top: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.add-city {
    font-size: 36px;
    margin-top: 10px;
    cursor: pointer;
}
.panels {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-direction: column;
    position: relative;
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    // background-image: linear-gradient(45deg, #ccc, yellowgreen);
    background: linear-gradient(-45deg, #496eaa, #944fa8, $primary, yellowgreen, #944fa8, #496eaa);
    background-size:1400% 300%;
    font-size: 18px;
    animation:bgMove 20s ease infinite;
    -webkit-animation: bgMove 20s ease infinite;
    -moz-animation: bgMove 20s ease infinite;
    &.now {
        cursor: pointer;
    }
}
.dialog-content {
    width: 0;
    left: -20px;
    top: -20px;
    height: 180px;
    border-radius: 15px;
    transition: all .5s;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    z-index: 10;
    // transform: translateX(-840px);
    // display: block;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    &.active {
        padding-left: 200px;
        width: 760px;
        // transform: translateX(0);
        opacity: 1;
        .dialog-main {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            .bottom .title,
            .top .panels.location {
                display: none;
            }
            .panels.suggestion {
                margin-right: 10px;
            }
        }
    }
}
.dialog-main {
    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .panels {
        flex: 1;
        &.suggestion {
            display: flex;
            flex-direction: row;
            margin-left: 10px;
            flex-wrap: wrap;
            padding: 10px 15px;
            box-sizing: border-box;
            .item {
                display: flex;
                flex-basis: 50%;
                text-align: left;
                flex-direction: column;
                &:nth-child(6n),
                &:nth-child(5n) {
                    .cont {
                        padding-bottom: 0;
                        border-bottom: 0;
                    }
                }
                .title {
                    margin: 0;
                    padding-bottom: 0;
                    font-size: 14px;
                    color: var(--text-color-ccc);
                    border-bottom: 0;
                }
                .cont {
                    font-size: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid var(--border-color);
                }
            }
        }
    }
    .title {
        font-size: 24px;
        margin: 20px 0;
        text-align: left;
        color: $white;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e8e8;
    }
    .bottom .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .panels {
            margin-right: 10px;
            .weather {
                margin-top: 0;
            }
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
}
@keyframes bgMove {
    0% {
        background-position: 0% 0%; }
    25% {
        background-position: 50% 50%; }
    50% {
        background-position: 50% 100%; }
    75% {
        background-position: 100% 50%; }
    100% {
        background-position: 100% 0%;
    }
}
.panels {
     .weather {
        font-size: 40px;
        height: 90px;
        // margin: 10px 0;
    }
    .wind {
        font-size: 16px;
        margin-top: 10px;
    }
    // .temperature,
    // .last_update {
    //     margin-top: 10px;
    // }
}
.close {
    position: absolute;
    left: 12px;
    top: 8px;
    font-size: 24px;
    color: $white;
    transform: rotate(0deg);
    transition: transform .3s;
    &:hover {
        color: $primary;
        transform: rotate(-90deg);
    }
}
</style>
