<script setup>
import { ref } from 'vue'
import Su7Blue from '@/assets/imgs/su7_blue.png'
import Su7White from '@/assets/imgs/su7_white.png'

const inset = ref(200)

const move = e => inset.value = e.offsetX
</script>

<template>
  <div class="w-[400px] h-[400px] t-card p-2 relative box-border" @mousemove="move">
    <div class="absolute top-0 left-0 right-0 h-10 rounded-t-md bg-blue-400 text-white text-sm flex items-center justify-center z-10">
      <slot />
    </div>
    <div class="h-full flex items-center relative  cursor-move">
      <img class="absolute" :src="Su7Blue" />
      <img class="absolute" :src="Su7White" :style="`clip-path: inset(0 0 0 ${inset}px)`" />
    </div>
  </div>
</template>