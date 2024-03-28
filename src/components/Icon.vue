<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import jobJson from '@/assets/lotties/job.json'

defineProps({
  width: String,
  height: String
})
</script>

<template>
  <Vue3Lottie :animationData="jobJson" :width="width" :height="height" />
</template>