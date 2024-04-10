<script setup>
import { ref, onUnmounted } from 'vue'

const [imgRef, videoRef, src, isInit, checked] = [ref(null), ref(null), ref(null), ref(true), ref(false)]
const position = ref({})
const [canvas, ctx] = [ref(null), ref(null)]
let interval


const loadModels = async () => {
  ctx.value.drawImage(videoRef.value, 0, 0, canvas.value.width, canvas.value.height)
  const url = canvas.value.toDataURL('image/png')
  src.value = url
  const ratio = canvas.value.width / imgRef.value.naturalWidth // 缩放比率
  const dects = await faceapi.detectAllFaces(imgRef.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  if (dects.length) {
    const box = dects[0].alignedRect.box
    position.value = {
      width: box.width * ratio,
      height: box.height * ratio,
      left: box.left * ratio,
      top: box.top * ratio * 0.96 // 修正系数
    }
  }
}

// 开启人脸检测
const face =  async () => {
  if (!checked.value) {
    clearInterval(interval)
    return
  }
  if (isInit.value) {
    canvas.value = document.createElement('canvas')
    ctx.value = canvas.value.getContext('2d')
    canvas.value.width = 400
    canvas.value.height = 400
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ])
    isInit.value = false
  }
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { width: 400, height: 400 } })
    .then(mediaStream => {
      videoRef.value.srcObject = mediaStream
      videoRef.value.onloadedmetadata = () => {
        interval = setInterval(loadModels,200)
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
      <el-checkbox v-model="checked" class="ml-1" @change="face" />
    </div>
    <template v-if="checked">
      <video ref="videoRef" class="relative w-full h-full object-cover rounded" autoplay @load="loadModels" />
      <img ref="imgRef" class="relative hidden" :src="src" />
      <div
        v-if="position.width"
        class="absolute z-10 dog-emoji"
        :style="{
          width: `${position.width}px`,
          height: `${position.height}px`,
          left: `${position.left}px`,
          top: `${position.top}px`
        }"
      ></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.dog-emoji {
  background: url('./dog.png') no-repeat center/cover;
}
</style>