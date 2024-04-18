<script setup>
import { ref } from 'vue'
import Bg1 from '@/assets/imgs/duorou/bg-1.png'
import Bg2 from '@/assets/imgs/duorou/bg-2.png'
import xianrenzhang from '@/assets/imgs/duorou/xianrenzhang.png'
import xiangrikui from '@/assets/imgs/duorou/xiangrikui.png'
import duorou1 from '@/assets/imgs/duorou/duorou1.png'
import duorou2 from '@/assets/imgs/duorou/duorou2.png'

const barList = [
  { name: 'home', title: '主页' },
  { name: 'community', title: '社区' },
  { name: 'shop', title: '商城' }
]
const list = [Bg1,Bg2]
const cards = [
  { type: 1, url: xianrenzhang, title: '仙人掌', desc: '叶片一般都是很饱满的,并且株型也很紧凑,植株看起来是很小巧的' },
  { type: 2, url: xiangrikui, title: '向日葵', desc: '向阳而生,喜阳植物' },
  { type: 3, url: duorou1, title: '多肉植物', desc: '多肉植物' },
  { type: 3, url: duorou2, title: '多肉植物', desc: '多肉植物' }
]
const current = ref(0)
const tabCurrent = ref(0)
</script>

<template>
  <div class="w-screen h-screen px-[28px] pt-[16px] wrapper">
    <div class="relative">
      <input class="rounded-full h-[44px] bg-slate-100 w-full indent-4" placeholder="搜索你想要的产品" />
      <Icon class="absolute right-4 top-[12px]" name="search" />
    </div>
    <van-swipe class="mt-[30px]" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item,i in list" :key="i" class="item">
        <img :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div class="mt-[30px] flex justify-between">
      <div
        v-for="item,i in ['全部', '向日葵', '仙人掌', '多肉植物']"
        :key="i"
        class="px-[18px] py-[6px] rounded-full bg-gray-100 text-slate-400"
        :class="current === i && 'active'"
        @click="current = i"
      >
        {{ item }}
      </div>
    </div>
    <div v-for="{ url, title, desc },i in cards.filter(item => current === 0 ? true : item.type === current)" :key="i" class="card mt-[18px] py-[20px] px-[16px] flex gap-[14px]">
      <img class="w-[104px] h-[104px] rounded-lg" :src="url" />
      <div class="flex flex-col">
        <h2>{{ title }}</h2>
        <span class="text-slate-400">{{ desc }}</span>
      </div>
    </div>
    <div class="mb-[100px]"></div>
    <div class="fixed bottom-0 left-0 w-full h-[83px] bg-white flex justify-evenly">
      <div v-for="{name,title},i in barList" :key="i" class="flex flex-col items-center text-sm" @click="tabCurrent = i">
        <Icon class="mt-2" :fill="tabCurrent === i && 'rgb(130, 201, 30)'" :name="name" />
        <span class="mt-1" :class="tabCurrent === i && 'tab-active'">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply overflow-y-scroll;
  box-shadow: 0px -100px 30px -30px inset rgb(0 0 0 / .4);
  &::-webkit-scrollbar {
    width: 0;
  }
}
.active {
  @apply bg-blue-400 text-white;
}
.tab-active {
  color: rgb(130, 201, 30);
}
.card {
  box-shadow: 0px -3px 6px  rgba(173, 174, 179, 0.09), 0px 3px 6px  rgba(173, 174, 179, 0.09);
  @apply rounded-[14px];
}
</style>