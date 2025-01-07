<template>
    <el-text type="primary">{{ options.output }}</el-text>
</template>
<script setup>
import EasyTyper from './main'
const options = reactive({
    output: '',
    type: 'rollback',
    isEnd: false,
    speed: 80,
    backSpeed: 40,
    sleep: 2000,
    singleBack: true,
    sentencePause: false
})
const featchData = ()  => {
    // https://v1.hitokoto.cn
    fetch('mock/data.json').then(res => res.json()).then(({hitokoto}) => {
        new EasyTyper(options, hitokoto, () => {
            featchData()
        })
    })
}
onMounted(() => {
    featchData()
})
</script>