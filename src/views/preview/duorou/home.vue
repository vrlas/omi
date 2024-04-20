<script setup>
import Bg1 from '@/assets/imgs/duorou/bg-1.png'
import Bg2 from '@/assets/imgs/duorou/bg-2.png'
import menus from './menus.vue'

const list = [Bg1,Bg2]
</script>

<template>
  <div class="w-screen px-[28px] pt-[16px] relative wrapper">
    <div class="relative">
      <input class="rounded-full h-[44px] bg-slate-100 w-full indent-4" placeholder="搜索你想要的产品" />
      <Icon class="absolute right-4 top-[12px]" name="search" />
    </div>
    <van-swipe class="mt-[30px]" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item,i in list" :key="i">
        <img :src="item" />
      </van-swipe-item>
    </van-swipe>
    <menus />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply overflow-y-scroll absolute left-0 top-0 right-0 bottom-[83px] pb-4;
  box-shadow: 0px -10px 30px -30px inset rgb(0 0 0 / .4);
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>