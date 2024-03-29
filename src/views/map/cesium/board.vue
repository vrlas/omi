<script setup>
const { position } = defineProps({ position: { type: Object, required: true } })
</script>

<template>
  <div className="absolute bottom-0 left-0 z-20 w-full h-[40px]">
    <div className="absolute w-full h-full opacity-40"></div>
    <div className="absolute w-full h-full text-white z-30 flex justify-end items-center text-sm">
      <span>经度: {{ position.lng }}</span>
      <span className="ml-2">纬度: {{ position.lat }}</span>
      <span className="ml-2">高程: {{ position.height }}</span>
      <span className="ml-2">俯仰角: {{ position.pitch }}</span>
      <span className="mx-2">方向: {{ position.heading }}</span>
    </div>
  </div>
</template>