<template>
    <NuxtLayout name="custom">
        <el-row class="friendlink" :gutter="10">
            <el-col v-for="item in links" :key="item.url" :span="6" class="mb-[--gap]">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <el-card shadow="hover">
                        <div class="flex flex-col items-center">
                            <el-image class="rounded-xl w-[40px]" :src="item.avatar||'https://avatar.iran.liara.run/public'"></el-image>
                            <div class="flex flex-col">
                                <el-text class="my-[--gap]">{{item.name }}</el-text>
                                <el-text class="h-[30px]">{{ item.nickname }}</el-text>
                                <!-- <el-text>{{ item.email }}</el-text> -->
                            </div>
                        </div>
                    </el-card>
                </a>
            </el-col>
        </el-row>
    </NuxtLayout>
</template>
<script setup>
const appConfig = useAppConfig();
const { links } = appConfig;
definePageMeta({
  layout: false,
})
</script>