<script setup>
import su7 from './components/su7.vue'
import face from './components/face.vue'
import scale from './components/scale.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <su7>图片滑块</su7>
    <face>人脸检测</face>
    <scale>图片滤镜</scale>
  </div>
</template>