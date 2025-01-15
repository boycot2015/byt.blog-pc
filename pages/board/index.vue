<!-- eslint-disable vue/no-v-html -->
<script setup>
import { ElMessage } from 'element-plus'
import Editor from '@/components/Editor/index'

const loading = ref(true)
const pageData = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})
const submitLoading = ref(false)
const formRef = ref(null)
const rules = reactive({
  name: [{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }],
  content: [{ required: true, message: '请输入留言内容', trigger: ['blur', 'change'] }],
})
const { public: config } = useRuntimeConfig()
const { status, data } = await useFetch(config.apiBase + '/comment/board', {
  method: 'get',
  params: { ...pageData.value },
})
onMounted(() => {
  loading.value = status.value === 'pending'
})
useHead({ title: '留言板' })
definePageMeta({
  layout: false,
})
defineOptions({ name: 'Board' })
const formData = ref({
  content: '',
  name: '',
  email: '',
})
const submit = () => {
  formData.value.content = formData.value.content.replace(/<p><br><\/p>/g, '')
  formRef.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      $fetch(config.apiBase + '/comment/board/add', {
        method: 'post',
        body: { ...formData.value },
      }).then(() => {
        loading.value = true
        $fetch(config.apiBase + '/comment/board', {
          method: 'get',
          params: { ...pageData.value },
        }).then((res) => {
          data.value = res
          loading.value = false
        })
      }).catch((err) => {
        ElMessage.error(err + '提交失败，请稍后再试！')
      }).finally(() => {
        submitLoading.value = false
      })
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <div class="blog-board">
    <NuxtLayout name="custom">
      <div class="board pd20 rounded-xl md:w-[1200px] mx-[auto] bgf text-left">
        <div class="title text-center mb-[--gap]">
          <h3>留言板</h3>
        </div>
        <el-form
          ref="formRef"
          :rules="rules"
          :model="formData"
          inline
        >
          <el-form-item prop="content" required class="w-full">
            <client-only>
              <Editor v-model="formData.content" placeholder="请输入留言..." :preview="false" />
            </client-only>
          </el-form-item>
          <el-form-item class="!flex flex-col !mr-0 md:flex-row w-full">
            <div class="flex flex-col md:flex-row w-full flex-nowrap">
              <el-form-item
                prop="name"
                required
                label="昵称："
                class="flex-1 !mr-0">
                <el-input v-model="formData.name" placeholder="请输入昵称" class="w-full" />
              </el-form-item>
              <el-form-item prop="email" label="邮箱：" class="flex-1 !mr-0 md:ml-2 mt-[--gap] md:mt-0">
                <el-input v-model="formData.email" placeholder="请输入邮箱" class="w-full" />
              </el-form-item>
              <el-form-item class="ml-2 !mr-0 self-end mt-[--gap] md:mt-0">
                <el-button type="primary" :loading="submitLoading" @click="submit">
                  提交
                </el-button>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <el-alert
          type="warning"
          :closable="false"
          class="mb-[--gap]"
          title="友链规则：昵称｜网址｜个性签名" />
        <div v-loading="loading">
          <el-row :gutter="10">
            <el-col
              v-for="item in data.data[0]"
              :key="item.id"
              :span="12"
              :sm="8"
              :lg="6"
              :xl="4"
            >
              <el-card
                class="mb-[--gap]"
                :header="'@'+item.name">
                <div v-html="item.content" />
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>
.board {
  padding: 15px;
  background-color: var(--el-mask-color);
}
.my-links {
  padding-top: 15px;
  margin-top: 20px;
  border-top: 1px dashed $primary;
  .title {
      font-size: 20px;
      font-weight: 400;
      line-height: 20px;
      height: auto;
      padding-left: 15px;
      position: relative;
      &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          border-radius: 4px;
          background: $primary;
      }
  }
  .list {
      // display: inline-grid;
      // grid-template-columns: auto auto auto auto;
      // grid-template-rows: auto auto auto auto;
      // grid-gap: 20px;
      &-item {
          font-size: 16px;
          cursor: pointer;
          // border: 1px solid $c-e8;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          overflow: hidden;
          transition: all 0.3s;
          &:nth-child(4n) {
              margin-right: 0;
          }
          &:hover {
              z-index: 2;
              transform: translateY(-5px);
              box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
          }
          &-link:hover {
              color: $primary;
          }
          .img {
              width: 100%;
              height: 150px;
              img {
                  height: 100%;
                  opacity: 0;
              }
          }
          .bottom {
              // padding: 10px 5px;
              // border-top: 1px solid $c-ccc;
              .name {
                  max-width: 120px;
              }
              .el-tag {
                  background-color:var(--primary-color);
                  line-height: 18px;
                  + .el-tag {
                      margin-left: 5px;
                  }
              }
          }
      }
  }
}
</style>
