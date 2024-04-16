<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const url = ref('')

onMounted(async () => {
  url.value = await QRCode.toDataURL('https://material.omi-m.fun/#/other/cool')
})
</script>

<template>
  <img className="w-[100px] h-[100px]" :src="url" />
</template>