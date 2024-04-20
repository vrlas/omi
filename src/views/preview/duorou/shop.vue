<script setup>
import { ref } from 'vue'
import menus from './menus.vue'
import pay from './pay.vue'

const success = ref(true)
</script>

<template>
  <div class="w-screen px-[28px] relative wrapper">
    <menus v-if="success" buy @success="() => success = !success" />
    <pay v-else />
  </div>
</template>