<script setup>
import { defineAsyncComponent } from 'vue'
import { Vue3Lottie as Lottie } from 'vue3-lottie'

const { name } = defineProps({
  name: { type: String, required: true },
  type: { type: String, defualt: 'svg' }, // 传入json表示为lottie
  width: { type: String, default: '16px' },
  fill: String,
  stroke: String,
  height: String
})
const icon = defineAsyncComponent(() => import(`../assets/svg/${name}.svg?component`))
</script>

<template>
  <template v-if="type === 'lottie'">
    <Lottie :animation-data="name" :width="width" :height="height || width" />
  </template>
  <template v-else>
    <em class="icon" :class="[stroke && 'stroke', fill && 'fill']">
      <component :is="icon" />
    </em>
  </template>
</template>

<style lang="scss">
.icon svg {
  width: v-bind(width);
  height: v-bind(width);
}
.fill.icon * {
  fill: v-bind(fill);
}
.stroke.icon path {
  stroke: v-bind(stroke);
}
</style>