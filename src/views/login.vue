<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Icon from '@/components/Icon.vue'
import Logo from '@/assets/logo.png'

const router = useRouter()
const user = ref({
  username: '',
  password: ''
})
const isShow = ref(false)
const loading = ref(false)
const valid = () => {
  return user.value.username && user.value.password
}
const login = () => {
  loading.value = true
  setTimeout(() => {
    const success = valid()
    if (success) {
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', '123')
      router.push('/home')
    } else {
      ElMessage({ message: '请确认填写无误后再提交', type: 'warning' })
    }
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="w-screen h-screen bg-white t-center">
    <!-- 卡片 -->
    <div class="container w-[1200px] h-[700px] bg-white flex rounded-r-lg t-shadow cursor:shadow-lg">
      <div class="left flex-1 bg-blue-400 rounded-l-lg">
        <Icon width="600px" />
      </div>
      <div class="right w-[600px] p-20">
        <p class="text-slate-600 text-[20px]">
          欢迎使用
        </p>
        <div class="flex gap-1 mt-4">
          <img class="cursor-pointer" :src="Logo" />
          <p class="text-[32px] text-slate-600 font-bold">
            Omi物料库
          </p>
        </div>
        <el-form :model="user">
          <div class="row flex flex-col mt-20">
            <p class="mb-1 text-sm">
              用户名：
            </p>
            <el-input v-model="user.username" style="height: 40px;width: 100%;" />
          </div>
          <div class="row flex flex-col mt-8">
            <p class="mb-1 text-sm">
              密码：
            </p>
            <el-input v-model="user.password" type="password" style="height: 40px" :show-password="isShow" />
          </div>
          <div class="row mt-8">
            <el-button class="w-full p-5 cursor-pointer" type="primary" :loading="loading" :disabled="loading" @click="login">
              登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 手机端响应式
.is-mobile {
  .container {
    @apply w-screen h-screen;
    .left {
      @apply hidden;
    }
    .right {
      @apply w-screen h-screen mx-auto flex flex-col items-center;
      .row {
        @apply w-screen px-10;
      }
    }
  }
}
</style>