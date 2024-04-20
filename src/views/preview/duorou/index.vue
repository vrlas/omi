<script setup>
import { ref } from 'vue'
import home from './home.vue'
import community from './community.vue'
import shop from './shop.vue'

const barList = [
  { name: 'home', title: '主页' },
  { name: 'community', title: '社区' },
  { name: 'shop', title: '商城' }
]
const tabCurrent = ref(0)
</script>

<template>
  <home v-if="tabCurrent === 0" />
  <community v-else-if="tabCurrent === 1" />
  <shop v-else></shop>
  <div class="fixed bottom-0 left-0 w-full h-[83px] bg-white flex justify-evenly select-none">
    <div v-for="{name,title},i in barList" :key="i" class="flex flex-col items-center text-sm" @click="tabCurrent = i">
      <Icon class="mt-2" :fill="tabCurrent === i && 'rgb(130, 201, 30)'" :name="name" />
      <span class="mt-1" :class="tabCurrent === i && 'tab-active'">{{ title }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-active {
  color: rgb(130, 201, 30);
}
</style>