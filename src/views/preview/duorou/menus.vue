<script setup>
import { ref } from 'vue'
import xianrenzhang from '@/assets/imgs/duorou/xianrenzhang.png'
import xiangrikui from '@/assets/imgs/duorou/xiangrikui.png'
import duorou1 from '@/assets/imgs/duorou/duorou1.png'
import duorou2 from '@/assets/imgs/duorou/duorou2.png'

defineProps({ buy: Boolean })
const emit = defineEmits(['success'])
const current = ref(0)
const cards = [
  { type: 1, url: xianrenzhang, title: '仙人掌', desc: '叶片一般都是很饱满的,并且株型也很紧凑,植株看起来是很小巧的,非常适合养活', rate: 5 },
  { type: 2, url: xiangrikui, title: '向日葵', desc: '向阳而生,喜阳植物', rate: 4 },
  { type: 3, url: duorou1, title: '多肉植物', desc: '多肉植物', rate: 5 },
  { type: 3, url: duorou2, title: '多肉植物', desc: '多肉植物', rate: 5 }
]
</script>

<template>
  <div class="mt-[30px] flex justify-between">
    <div
      v-for="item,i in ['全部', '向日葵', '仙人掌', '多肉植物']"
      :key="i"
      class="px-[18px] py-[6px] rounded-full bg-gray-100 text-slate-400 select-none"
      :class="current === i && 'active'"
      @click="current = i"
    >
      {{ item }}
    </div>
  </div>
  <div v-for="{ url, title, desc, rate },i in cards.filter(item => current === 0 ? true : item.type === current)" :key="i" class="card relative mt-[18px] py-[20px] px-[16px] flex gap-[14px]">
    <img class="w-[104px] h-[104px] rounded-lg" :src="url" />
    <div class="relative flex flex-col">
      <h2>{{ title }}</h2>
      <span class="text-slate-400 multiple text-sm">{{ desc }}</span>
      <div class="absolute left-0 bottom-2 flex gap-1">
        <Icon v-for="m in 5" :key="m" name="star" :fill="m > rate ? 'gray' : 'orange'" />
      </div>
    </div>
    <div
      v-if="buy"
      class="absolute bottom-0 right-0 bg-[#4DBD2B] text-white rounded-br-xl rounded-tl-xl px-8 py-2 active:opacity-80 select-none"
      @click="emit('success')"
    >
      购买
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  @apply bg-blue-400 text-white;
}
.card {
  box-shadow: 0px -3px 6px  rgba(173, 174, 179, 0.09), 0px 3px 6px  rgba(173, 174, 179, 0.09);
  @apply rounded-[14px];
}
.multiple {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>