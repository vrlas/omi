<script setup>
import { ref, watch } from 'vue'
import Logo from '@/assets/logo.png'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { flatArray } from '@/utils'
import { menus, mockList } from '@/mock'
import { ArrowDown, ChatLineSquare } from '@element-plus/icons-vue'

const [route, router] = [useRoute(), useRouter()]
const map = new Map([['edit', '编辑'], ['info', '详情']])
const links = ref([])

const currentCode = ref('')
const toLogin = () => {
  localStorage.clear()
  router.push('/login')
}

watch(route, () => {
  // 路由改变初始化数据
  currentCode.value = ''
  links.value.length = 0
  const stack = route.path.slice(1).split('/')
  // 首位地址(避免多轮筛选)
  const find = menus.find(item => item.link === stack[0])
  if (!find) return
  const match = flatArray([find])
  let n = 0, bool = true
  let real
  while(match && stack.length) {
    const pop = stack.pop()
    if (n === 0 && [...map.keys()].includes(pop)) {
      real = { name: map.get(pop), path: route.path }
      n++
    } else {
      const str = stack.join('/')
      const handleStr = str ? `${str}/${pop}` : pop
      const { name, link, code } = match.find(x => x.link === handleStr)
      if (bool && code && `/${link}` === route.path) {
        currentCode.value = code
        bool = false
      }
      real = { name, link, code }
    }
    links.value.unshift(real)
  }
}, { immediate: true })
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="h-[80px] flex justify-between items-center select-none px-2">
      <div class="flex items-center">
        <img class="cursor-pointer" :src="Logo" />
        <span class="ml-1 text-[24px] text-slate-600 font-bold">Omi物料库</span>
      </div>
      <div class="flex items-center h-[36px] px-2">
        <el-dropdown trigger="click">
          <el-badge :value="mockList.length" class="mr-6 flex items-center cursor-pointer font-bold text-blue-500 hover:text-blue-600">
            <el-icon :size="20"><ChatLineSquare /></el-icon>
          </el-badge>
          <template #dropdown>
            <div class="max-h-[140px] text-slate-600 cursor-pointer">
              <div v-for="item,i in mockList" :key="i" class="px-4 py-2 hover:bg-blue-200 hover:text-white">{{item}}</div>
            </div>
          </template>
        </el-dropdown>
        <div class="bg-blue-400 rounded">
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
    </div>
    <div class="t-container flex shadow-inner" style="height: calc(100vh - 80px)">
      <div class="left w-[280px] select-none">
        <div class="w-[260px] ml-[10px] mt-2 bg-white">
          <el-menu router :default-active="route.path.slice(1)" class="border-none mt-1 menus" style="height: 200px;">
            <el-sub-menu v-for="item, i in menus" :key="i" :index="item.link">
              <template #title>{{ item.name }}</template>
              <el-menu-item v-for="{ name, link },j in item.children" :key="`${i}-${j}`" :index="link" @click="router.push(`/${link}`)">{{ name }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="right t-gray box-content flex flex-col p-2 w-full" style="height: calc(100% - 16px)">
        <div class="h-full">
          <div v-if="links.length" class="t-card flex items-center mb-2">
            <el-breadcrumb separator="/">
              <template v-for="{ name, link }, i in links" :key="i">
                <el-breadcrumb-item v-if="i === 0 || i === links.length - 1">
                  <span class="cursor-not-allowed">{{ name }}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path: `/${link}` }">{{ name }}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <source-code v-if="currentCode" :code="currentCode" />
          </div>
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-item.is-active {
  @apply bg-blue-400 text-white box-content px-4;
}

// 手机端响应式
.is-mobile {
  .t-container {
    @apply flex flex-col overflow-hidden;
    .left {
      @apply w-full mb-2;
      .menus {
        width: calc(100vw - 10px);
        @apply overflow-auto;
      }
    }
    .right {
      // display: 
    }
  }
}
</style>