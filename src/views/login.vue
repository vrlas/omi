<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Icon from '@/components/Icon.vue'

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
  const success = valid()
  if (success) {
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('token', '123')
    router.push('/home')
  } else {
    ElMessage({ message: '请确认填写无误后再提交', type: 'warning' })
  }
}
</script>

<template>
  <div class="w-screen h-screen bg-[#F1F3FF] t-center">
    <!-- 卡片 -->
    <div class="min-w-[1200px] min-h-[700px] bg-white flex rounded-r-lg shadow-sm cursor:shadow-lg">
      <div class="flex-1 bg-blue-400 rounded-l-lg">
        <Icon width="600px" />
      </div>
      <div class="min-w-[600px] p-20">
        <p class="text-slate-600">欢迎使用</p>
        <p class="text-[32px] text-blue-400 font-bold">Omi物料库</p>
        <div class="flex flex-col mt-8">
          <p class="mb-1 text-sm">用户名：</p>
          <el-input v-model="user.username" style="height: 40px" placeholder="请输入" />
        </div>
        <div class="flex flex-col mt-8">
          <p class="mb-1 text-sm">密码：</p>
          <el-input v-model="user.password" type="password" style="height: 40px" placeholder="请输入" :show-password="isShow" />
        </div>
        <div class="w-full mt-8">
          <el-button type="primary" style="width: 100%;padding: 20px;cursor:pointer" :loading="loading" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>