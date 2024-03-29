<script setup>
const path = defineProps({
  code: String
})
</script>

<template>
  <a :href="`https://github.com/sineava/omi/blob/master/src/views${code}`" class="absolute right-2 top-2 cursor-pointer bg-blue-400 rounded p-1 hover:bg-blue-600" target="_blank">
    <svg t="1711677540319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1477" width="20" height="20"><path d="M153.770667 517.558857l200.387047-197.241905L302.86019 268.190476 48.761905 518.290286l254.439619 243.614476 50.590476-52.833524-200.021333-191.512381zM658.285714 320.316952L709.583238 268.190476l254.098286 250.09981L709.241905 761.904762l-50.590476-52.833524 200.021333-191.512381L658.285714 320.316952z m-112.981333-86.186666L393.99619 785.554286l70.534096 19.358476 151.30819-551.399619-70.534095-19.358476z" p-id="1478" fill="#fff"></path></svg>
  </a>
</template>