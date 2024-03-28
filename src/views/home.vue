<script setup>
import { ref, watch } from 'vue'
import Logo from '@/assets/logo.png'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { flatArray } from '@/utils'
import { menus } from '@/mock'
import { ArrowDown } from '@element-plus/icons-vue'

const [route, router] = [useRoute(), useRouter()]
const map = new Map([['edit', '编辑'], ['info', '详情']])
const links = ref([])

const toLogin = () => {
  localStorage.clear()
  router.push('/login')
}

watch(route, () => {
  links.value.length = 0
  const stack = route.path.slice(1).split('/')
  // 首位地址(避免多轮筛选)
  const find = menus.find(item => item.link === stack[0])
  if (!find) return
  const match = flatArray([find])
  let n = 0
  let real
  while(match && stack.length) {
    const pop = stack.pop()
    if (n === 0 && [...map.keys()].includes(pop)) {
      real = { name: map.get(pop), path: route.path }
      n++
    } else {
      const str = stack.join('/')
      const handleStr = str ? `${str}/${pop}` : pop
      const { name, link } = match.find(x => x.link === handleStr)
      real = { name, link }
    }
    links.value.unshift(real)
  }
}, { immediate: true })
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <div class="w-screen !h-[80px] flex justify-between items-center select-none px-2">
      <div class="flex items-center">
        <img class="cursor-pointer" :src="Logo" />
        <span class="ml-1 text-[24px] text-slate-600 font-bold">Omi组件库</span>
      </div>
      <div class="flex items-center bg-green-600 rounded h-[36px] px-2 select-none">
        <el-dropdown>
          <div class="p-2 outline-none">
            <span class="text-white mr-2">admin</span>
            <el-icon class="text-white"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toLogin()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="w-screen flex flex-1 shadow-inner">
      <div class="w-[280px] select-none">
        <div class="w-[260px] ml-[10px] mt-2 bg-white">
          <el-menu class="border-none mt-1" style="height: 200px;">
            <el-sub-menu v-for="item, i in menus" :key="i" :index="item.link">
              <template #title>{{ item.name }}</template>
              <el-menu-item v-for="{ name, link },j in item.children" :key="`${i}-${j}`" :index="link" @click="router.push(`/${link}`)">{{ name }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="flex-1 t-gray p-2">
        <div class="h-full">
          <div v-if="links.length" class="card p-4 mb-2 bg-white">
            <el-breadcrumb separator="/">
              <template v-for="{ name, link }, i in links" :key="i">
                <el-breadcrumb-item v-if="i === 0 || i === links.length - 1">
                  <span class="cursor-not-allowed">{{ name }}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path: `/${link}` }">{{ name }}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </div>
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>