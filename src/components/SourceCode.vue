<script setup>
defineProps({ code: String })
</script>

<template>
  <a :href="`https://github.com/sineava/omi/blob/master/src/views${code}`" class="p-1 box-border cursor-pointer bg-blue-400 rounded hover:bg-blue-600" target="_blank">
    <Icon name="code" />
  </a>
</template>