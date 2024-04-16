<script setup>
import su7 from './component/su7.vue'
import face from './component/face.vue'
import move from './component/move.vue'
import qrcode from './component/qrcode.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <su7>图片滑块</su7>
    <face>人脸检测</face>
    <move>图片滤镜</move>
    <qrcode>二维码生成</qrcode>
  </div>
</template>