<script setup>
import { ref, onMounted } from 'vue'

const position = ref({ left: 0, top: 0 })
const boxRef = ref(null)
const container = { w: 200, h: 200 }
const pos = ref({ left: 0, top: 0, rLeft: 0, rTop: 0 })

const move = e => {
  let left = e.pageX - pos.value.left - container.w / 2
  let top = e.pageY - pos.value.top - container.h / 2
  if (left < 0) left = 0
  if (left >= container.w) left = container.w
  if (top < 0) top = 0
  if (top >= container.h - 40) top = container.h - 40
  position.value = { left, top }
}

onMounted(() => {
  const rect = boxRef.value.getBoundingClientRect()
  pos.value = { left: rect.left, top: rect.top }
})
</script>

<template>
  <div class="w-[400px] h-[400px] t-card box-border p-0 relative flex flex-col z-10">
    <div class="w-full h-10 rounded-t-md bg-blue-400 text-white text-sm flex items-center justify-center z-20">
      <slot />
    </div>
    <div ref="boxRef" class="ttt w-full avatar flex-1 relative cursor-move" @mousemove="move">
      <div
        class="absolute w-[200px] h-[200px] bg-gray-400 opacity-100 border-4 border-double z-10 bigger"
        :style="`left: ${position.left}px;top: ${position.top}px;background-position: ${-position.left}px ${-position.top}px`"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  background: url('@/assets/imgs/panda.png') no-repeat 0 0/cover;
}
.bigger {
  background: url('@/assets/imgs/panda.png') no-repeat 0 0;
  background-size: 200% 204%;
  filter: hue-rotate(180deg);
}
</style>