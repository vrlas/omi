<script setup>
import logo from '@/assets/imgs/login/logo.png'
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <div class="bg w-full h-[280px]">
      <img class="mx-auto mt-[120px] w-[56px]" :src="logo" />
      <p class="text-center font-bold m-4">
        即时设计,共享开源
      </p>
    </div>
    <div class="w-[311px] mt-[56px]">
      <div>
        <p>手机号</p>
        <input class="input" placeholder="请输入手机号" />
      </div>
      <div class="mt-[24px] relative">
        <p>验证码</p>
        <input class="input" placeholder="请输入验证码" />
        <span class="desc absolute bottom-1 right-0">获取验证码</span>
      </div>
      <div class="btn">
        立即登录
      </div>
      <div class="mt-[24px] text-center">
        登录及接受 <span class="desc">用户协议</span> 及 <span class="desc">隐私授权</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-green: rgba(22, 200, 201, 1);
.bg {
  background: url('@/assets/imgs/login/bg.png') no-repeat 0/cover;
}
.input {
  border-bottom: 1px solid rgba(237, 240, 240, 1);
  @apply w-full h-[40px] outline-none bg-transparent text-sm;
}
.btn {
  background: linear-gradient(to right, #09E3A5, #19C2D1);
  @apply h-[44px] rounded-full mt-[32px] text-lg text-white flex justify-center items-center;
}
.desc {
  color: $color-green;
}
</style>