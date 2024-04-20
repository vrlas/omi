<template>
  <div class="h-[376px] bg-[#4DBD2B] -mx-[28px] t-center flex-col">
    <div class="flex gap-2">
      <Icon name="database" width="70" />
      <div class="flex flex-col justify-center text-white">
        <p>支付成功！</p>
        <h6>感谢您的购买</h6>
      </div>
    </div>
    <div class="w-[320px] h-[14px] bg-[#14A316] mt-[58px] rounded-full relative">
      <div class="abs h-[349px] bg-white shadow-lg rounded-lg px-[20px]">
        <div class="text-center text-[32px] mt-[30px] font-bold">
          ￥288.6
        </div>
        <p class="mt-[44px]">
          订单编号：<span class="text-gray-500">1234567890</span>
        </p>
        <p class="mt-[30px]">
          下单时间：<span class="text-gray-500">2021-10-11 21:01:23</span>
        </p>
        <p class="mt-[30px]">
          支付方式：<span class="text-gray-500">银行卡支付</span>
        </p>
        <p>
          <Icon name="tiaoxingma" width="320px" />
        </p>
      </div>
      <div class="abs w-[308px] left-[6px] top-[4px] h-[10px] bg-[#14A316] filter"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  filter: blur(14px);
}
.abs {
  @apply absolute w-[308px] left-[6px] top-[4px];
}
</style>