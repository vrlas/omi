<script setup>
import { ref, onUnmounted } from 'vue'
import img from './image.png'

const [imgRef, videoRef, src, current, isInit] = [ref(null), ref(null), ref(null), ref(0), ref(true)]
let interval
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 400
const position = ref({})
const checked = ref(false)

const loadModels = async () => {
  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
  const url = canvas.toDataURL('image/png', 0.1)
  src.value = url
  const ratio = canvas.width / imgRef.value.naturalWidth // 缩放比率
  const dects = await faceapi.detectAllFaces(imgRef.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  if (dects.length) {
    const box = dects[0].alignedRect.box
    position.value = {
      width: box.width * ratio,
      height: box.height * ratio,
      left: box.left * ratio,
      top: box.top * ratio * 0.96 // 修正系数
    }
  } else {
    position.value = {}
  }
}

// 开启人脸检测
const face =  async () => {
  if (!checked.value) {
    clearInterval(interval)
    return
  }
  if (isInit.value) {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ])
    isInit.value = false
  }
  const constraints = { audio: false, video: { width: 400, height: 400 } };
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
  <div class="relative t-card w-[400px] h-[400px] p-0">
    <div class="absolute top-0 left-0 right-0 h-10 rounded-t-md bg-blue-400 text-white text-sm flex items-center justify-center cursor-pointer z-10">
      <slot />
      <el-checkbox class="ml-1" v-model="checked" @change="face" />
    </div>
    <template v-if="checked">
      <video class="relative w-full h-full object-cover rounded" autoplay ref="videoRef" @load="loadModels" />
      <img class="relative hidden" :src="src" ref="imgRef" />
      <div v-if="position.width"
        class="absolute z-10 dog-emoji"
        :style="{
          width: `${position.width}px`,
          height: `${position.height}px`,
          left: `${position.left}px`,
          top: `${position.top}px`
        }"></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.dog-emoji {
  background: url('./dog.png') no-repeat center/cover;
}
</style>