<script setup>
const { position } = defineProps({ position: { type: Object, required: true } })
</script>

<template>
  <div class="absolute top-1 left-1 z-20 w-full h-[40px]">
    <div class="absolute w-full h-full text-white z-30 flex justify-end items-center text-sm font-bold pr-2">
      <span>经度: {{ position.lng }}</span>
      <span class="ml-2">纬度: {{ position.lat }}</span>
      <span class="ml-2">高程: {{ position.height }}</span>
      <span class="ml-2">俯仰角: {{ position.pitch }}</span>
      <span class="mx-2">方向: {{ position.heading }}</span>
    </div>
  </div>
</template>