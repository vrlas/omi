<script setup>
import Logo from '@/assets/logo.png'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const menus = [
  {
    name: 'wps',
    link: '/wps',
    children: [
      { name: 'excel', link: '/wps/excel' },
      { name: 'word', link: '/wps/word' },
      { name: 'pdf', link: '/wps/pdf' }
    ]
  }
]

const toPage = link => router.push(link)
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <div class="w-screen h-[100px] flex items-center select-none">
      <img class="ml-4 cursor-pointer" :src="Logo" />
      <span class="ml-1 text-[24px] text-slate-600 font-bold">Omi组件库</span>
    </div>
    <div class="w-screen flex flex-1 shadow-inner">
      <div class="w-[280px] select-none">
        <div class="w-[260px] ml-[10px] mt-2 bg-white">
          <el-menu class="border-none mt-1" style="height: 200px;">
            <el-sub-menu v-for="item, i in menus" :key="i">
              <template #title>{{ item.name }}</template>
              <el-menu-item v-for="{ name, link },j in item.children" :key="`${i}-${j}`" :index="link" @click="toPage(link)">{{ name }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="flex-1 t-gray">
        <RouterView />
      </div>
    </div>
  </div>
</template>