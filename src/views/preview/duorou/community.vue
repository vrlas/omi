<script setup>
import avatar1 from '@/assets/imgs/duorou/avatar1.png'
import avatar2 from '@/assets/imgs/duorou/avatar2.png'
import bg1 from '@/assets/imgs/duorou/bg-1.png'
import bg2 from '@/assets/imgs/duorou/bg-2.png'

const list = [
  { avatar: avatar1, name: '方恩语', img: bg1, desc: '下面我们会从不同维度来分析一下该产品的文案设计排版相关的细节' },
  { avatar: avatar2, name: '杨晓奇', img: bg2, desc: '作为用户和产品之间的桥梁，社交分享在产品的重要性不言而喻' }
]
</script>

<template>
  <div class="w-screen px-[28px] relative container">
    <div v-for="{avatar, name, img, desc}, i in list" :key="i" class="mx-auto py-[18px]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img class="w-[36px] h-[36px]" :src="avatar" />
          <div class="flex flex-col">
            <span>{{ name }}</span>
            <span class="text-sm text-slate-500">18分钟前</span>
          </div>
        </div>
        <div class="bg-blue-500 px-3 h-[26px] text-sm text-white rounded-2xl leading-[26px] active:opacity-80">
          关注
        </div>
      </div>
      <img class="w-full my-3" :src="img" />
      <p class="text-sm single">
        {{ desc }}
      </p>
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center">
          <Icon class="mr-1" name="look" />98
          <Icon class="mr-1 ml-4" name="talk" />14
          <Icon class="mr-1 ml-4" name="share" />32
        </div>
        <Icon name="heart" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container>div:not(:last-child) {
  @apply border-b;
}
.single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>