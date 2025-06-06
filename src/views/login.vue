<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import Logo from '@/assets/logo.png'
import {
  Refresh,
  CircleClose
} from '@element-plus/icons-vue'
import jobJson from '@/assets/lotties/job.json'

const router = useRouter()
const user = ref({username: '', password: ''})
const loading = ref(false)
const left = ref(0)
let initAngle = Math.floor(Math.floor(Math.random() * (320 - 40 + 1)) + 40) // 初始偏转角度(40-320)
const imgs = [
  'avatar-1.jpg',
  'avatar-2.jpg',
  'avatar-3.jpg',
  'avatar-4.jpg',
  'avatar-5.jpg'
]
const random = ref(Math.floor(Math.random() * imgs.length))
const angle = ref(initAngle)
const draggable = ref(false)
const boxRef = ref(null)
const offset = ref(100)
const show = ref(null)
const showImg = ref(true)
const res = ref('none')

const valid = () => {
  return user.value.username && user.value.password && user.value.username === 'admin' && user.value.password === '123456'
}

const mousedown = () => {
  draggable.value = true
  offset.value = boxRef.value.getBoundingClientRect().left
}

const mousemove = e => {
  if (draggable.value) {
    const pixel = e.pageX - offset.value
    if (pixel <= 30) {
      left.value = 0
    } else if (pixel < 314 - 30) {
      left.value = pixel - 30
    } else {
      left.value = 314 - 60
    }
    const moreAngle = Math.floor(left.value / 70 * 100)
    angle.value = initAngle + moreAngle
  }
}

const showValid = () => {
  if (!valid()) {
    ElNotification({ title: 'Warning', message: '请确认填写无误后再提交', type: 'warning' })
    return
  }
  // 移动端暂时不做数字验证
  if (document.body.classList.contains('is-mobile')) {
    loading.value = true
    setTimeout(toHome, 2000)
  } else {
    show.value = true
  }
}

const refresh = () => {
  let n
  // 避免随机数一致问题
  do {
    n = Math.floor(Math.random() * imgs.length)
  } while (n === random.value)
  showImg.value = false
  random.value = n
  initAngle = Math.floor(Math.floor(Math.random() * (320 - 40 + 1)) + 40)
  angle.value = initAngle
  setTimeout(() => {
    showImg.value = true
  }, 500)
}

const toHome = () => {
  loading.value = false
  localStorage.setItem('user', JSON.stringify(user.value))
  localStorage.setItem('token', '123')
  router.replace('/home')
}

const cancel = () => {
  if (!draggable.value) return
  draggable.value = false
  res.value = (angle.value % 360 < 10 || angle.value % 360 > 350) ? 'success' : 'error'
  // 范围区间都算验证成功
  if (res.value === 'success') {
    loading.value = true
    setTimeout(toHome, 2000)
  } else {
    left.value = 0
    refresh()
  }
  const timout = setTimeout(() => {
    res.value = 'none'
    clearTimeout(timout)
  }, 2000)
}

onMounted(async () => {
  document.addEventListener('keydown', ({ keyCode }) => keyCode === 13 && showValid())
  // 鼠标放开取消拖拽
  document.addEventListener('mouseup', cancel)
})
</script>

<template>
  <div class="w-screen h-screen bg-white t-center">
    <!-- 卡片 -->
    <div class="container w-[1200px] h-[700px] bg-white flex rounded-r-lg t-shadow cursor:shadow-lg">
      <div class="left flex-1 bg-blue-400 rounded-l-lg">
        <Icon :name="jobJson" type="lottie" :width="600" />
      </div>
      <div class="right w-1/2 flex t-center">
        <div class="w-[330px]">
          <p class="text-slate-600 text-[20px] center">
            欢迎使用
          </p>
          <div class="flex gap-1 mt-4 center">
            <img class="cursor-pointer" :src="Logo" />
            <p class="text-[32px] text-slate-600 font-bold">
              Omi物料库
            </p>
          </div>
          <el-form class="mt-10" :model="user">
            <div class="row flex flex-col">
              <p class="mb-1 text-sm">
                用户名：
              </p>
              <el-input v-model="user.username" style="height: 40px;width: 100%;" placeholder="测试账户: admin" />
            </div>
            <div class="row flex flex-col mt-8">
              <p class="mb-1 text-sm">
                密码：
              </p>
              <el-input v-model="user.password" type="password" style="height: 40px" placeholder="测试密码: 123456" />
            </div>
            <div class="row mt-8 relative">
              <el-button class="w-full p-5 cursor-pointer" size="large" :loading="loading" type="primary" @click.enter="showValid">
                登录
              </el-button>
              <div v-if="show" class="absolute left-0 bottom-14 w-full h-[330px] rounded slider p-2 select-none" @mousemove="mousemove">
                <p class="text-sm font-medium text-center">
                  拖动滑块,使图片角度为正
                </p>
                <div class="mx-auto w-[180px] h-[180px] my-4 relative">
                  <img v-show="!showImg" class="t-abs-center" src="https://minio.tianai.cloud/public/static/captcha/images/loading.gif" />
                  <img
                    v-show="showImg"
                    class="border-4 border-white rounded-full relative w-full h-full"
                    :src="`/imgs/${imgs[random]}`"
                    :style="`transform: rotate(${angle}deg)`"
                  />
                  <img v-show="showImg" class="t-abs-center w-full h-full" src="https://minio.tianai.cloud/public/static/captcha/images/axis.png" />
                </div>
                <div ref="boxRef" class="relative h-[40px]">
                  <div v-if="res === 'success'" class="absolute valid-res bg-green-500 opacity-80">
                    验证成功
                  </div>
                  <div v-if="res === 'error'" class="absolute valid-res bg-red-500 opacity-80">
                    验证失败
                  </div>
                  <div class="absolute w-full h-full bg-[#f5f5f5] opacity-80"></div>
                  <div class="absolute w-[20px] h-full bg-blue-400" :style="`width: ${left}px`"></div>
                  <div class="absolute h-full w-[60px] cursor-pointer plane" :style="`left: ${left}px`" draggable @mousedown="mousedown"></div>
                </div>
                <div class="flex h-8 justify-end mt-2 text-gray-600 cursor-pointer w-14 ml-auto mr-0 gap-2">
                  <Refresh @click="refresh" /><CircleClose @click="show = false" />
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  background:  url('https://minio.tianai.cloud/public/captcha-btn/btn2-bg.jpg') no-repeat center/cover;
  .plane {
    background: url('https://minio.tianai.cloud/public/captcha-btn/btn4.png') no-repeat center/cover;
  }
  .valid-res {
    animation: fade .5s linear;
    @apply absolute bottom-12 w-full text-white flex items-center pl-2 text-sm h-8;
  }
}

// 手机端响应式
.is-mobile {
  .container {
    @apply w-[screen] h-screen bg-white shadow-none rounded-none;
    .left {
      @apply hidden;
    }
    .right {
      @apply w-screen h-screen mx-auto flex flex-col items-center;
    }
    .center {
      @apply justify-center text-center;
    }
  }
}

.i-home {
  font-family: 'i-home';
}

@keyframes fade {
  from { @apply h-2 opacity-0; }
  to { @apply h-8 opacity-100; }
}
</style>