<script setup>
import { ref, watch } from 'vue'
import Logo from '@/assets/logo.png'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { flatArray } from '@/utils'
import { menus } from '@/mock'
import SourceCode from '@/components/SourceCode.vue'

const [route, router] = [useRoute(), useRouter()]
const map = new Map([['edit', '编辑'], ['info', '详情']])
const links = ref([])

const currentCode = ref('')
const logout = () => {
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
  let n = 0, bool = true, real
  while(stack.length) {
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
    <div class="h-[80px] flex items-center select-none box-border">
      <div class="flex items-center">
        <img class="cursor-pointer ml-4 w-12" :src="Logo" />
        <span class="text-[24px] text-slate-600 font-bold ml-2">Omi物料库</span>
      </div>
    </div>
    <div class="t-container flex" style="height: calc(100vh - 80px)">
      <div class="left py-2 pl-2 box-border w-[280px] select-none relative t-gray rounded">
        <div class="bg-white flex flex-col h-full rounded">
          <div class="flex-1 p-2">
            <el-menu router :default-active="route.path.slice(1)" class="!border-none" @select="index => router.push(`/${index}`)">
              <el-sub-menu v-for="item, i in menus" :key="i" :index="item.link">
                <template #title>
                  {{ item.name }}
                </template>
                <el-menu-item v-for="{ name, link },j in item.children" :key="`${i}-${j}`" :index="link">
                  {{ name }}
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </div>
          <div class="logout absolute h-[40px] left-4 right-4 bottom-4 rounded text-sm logout flex justify-center items-center cursor-pointer bg-green-400 text-white" @click="logout">
            <Icon name="back" class="mr-1" />登出
          </div>
        </div>
      </div>
      <div class="right t-gray box-content flex-1 flex flex-col p-2 relative">
        <div class="h-full">
          <div v-if="links.length" class="t-card flex items-center justify-between">
            <el-breadcrumb separator="/">
              <template v-for="{ name, link }, i in links" :key="i">
                <el-breadcrumb-item v-if="i === 0 || i === links.length - 1">
                  <span class="cursor-not-allowed">{{ name }}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path: `/${link}` }">
                  {{ name }}
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <SourceCode v-if="currentCode" :code="currentCode" />
          </div>
          <div class="absolute top-[60px] left-2 right-2 bottom-2" :class="links.length ? 'top-16' : 'top-2'">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-item.is-active {
  @apply bg-blue-400 text-white box-content px-4 rounded;
}

.logout>svg {
  transition: transform 1s linear;
}
.logout:hover>svg {
  @apply -translate-x-1;
  transition: transform linear .4s;
}

// 手机端响应式
.is-mobile {
  .t-container {
    @apply flex flex-col;
    .left {
      @apply w-full px-0 pt-0 relative;
      .logout {
        @apply relative w-[96%] mx-auto left-0 mt-4;
      }
    }
  }
}
</style>