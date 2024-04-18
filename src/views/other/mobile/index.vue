<script setup>
import { ref, onMounted } from 'vue'
import login from '@/assets/imgs/login.png'
import duorou from '@/assets/imgs/duorou.png'
import QRCode from 'qrcode'

const list = ref([])

onMounted(async () => {
  const path1 = await QRCode.toDataURL('https://material.omi-m.fun/#/preview/login')
  const path2 = await QRCode.toDataURL('https://material.omi-m.fun/#/preview/duorou')
  list.value = [
    { img: login, path: path1 },
    { img: duorou, path: path2 }
  ]
})
</script>

<template>
  <div class="flex flex-wrap gap-4 h-full">
    <div v-for="{ img, path },i in list" :key="i" class="container w-[356px] h-full relative cursor-pointer overflow-hidden bg-white">
      <img class="h-full" :src="img" />
      <div class="absolute left-0 top-0 w-full h-full z-10 mask hidden">
        <img class="absolute img w-[200px] opacity-100" :src="path" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  background-color: rgba(0,0,0,.6);
}
.container:hover .mask {
  @apply block;
}
.img {
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>