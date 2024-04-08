<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import img from './image.png'

const [imgRef, videoRef, src, current, isInit] = [ref(null), ref(null), ref(null), ref(0), ref(true)]
let interval
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 450
const position = ref({})

const loadModels = async () => {
  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
  const url = canvas.toDataURL('image/png', 0.1)
  src.value = url
  const ratio = canvas.width / imgRef.value.naturalWidth // 缩放比率
  const dects = await faceapi.detectAllFaces(imgRef.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  if (dects.length) {
    const box = dects[0].alignedRect.box
    position.value = {
      width: box.width * ratio * 1.1,
      height: box.height * ratio * 1.1,
      left: box.left * ratio,
      top: box.top * ratio * 0.8 // 修正系数
    }
  } else {
    position.value = {}
  }
}

// 开启人脸检测
const face =  async () => {
  current.value = current.value === 1 ? 0 : 1
  if (current.value !== 1) {
    clearInterval(interval)
    return
  }
  if (isInit.value) {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ])
    console.log(1)
    isInit.value = false
  }
  const constraints = { audio: false, video: { width: 1280, height: 720 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(mediaStream => {
      videoRef.value.srcObject = mediaStream
      videoRef.value.onloadedmetadata = () => {
        interval = setInterval(loadModels,100)
      }
  })
}

onUnmounted(() => {
  interval && clearInterval(interval)
})
</script>

<template>
  <div class="relative t-card h-full">
    <el-button :type="current === 1 && 'primary'" @click="face">视频换狗头</el-button>
    <div v-if="current === 1" class="h-full translate-y-2">
      <video class="relative w-[800px]" autoplay ref="videoRef" @load="loadModels" />
      <img class="relative hidden" :src="src" ref="imgRef" />
      <div v-if="position.width"
        class="absolute z-10 dog-emoji"
        :style="{
          width: `${position.width}px`,
          height: `${position.height}px`,
          left: `${position.left}px`,
          top: `${position.top}px`
        }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dog-emoji {
  background-color: red;
  background: url('./dog.png') no-repeat center/cover;
}
</style>