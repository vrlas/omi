<script setup>
import { ref, onBeforeMount } from 'vue'
import { exportTable, readExcel } from '@/utils/tool'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
// import {
//   Edit,
//   View,
//   Delete
// } from '@element-plus/icons-vue'
// import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// const [route, router] = [useRoute(), useRouter()]
const fileRef = ref(null)
const loading = ref(false)
const head = { name: '项目', desc: '描述', language: '语言', stars: 'star数', forks: 'fork数' }
const data = ref([])
const props = defineProps({
  name: { type: String, default: '表格.xlsx' },
  config: {
    type: Object,
    default: () => ({ enable: false, enableCenter: false, enableWidth: false, enableHeaderBackground: false })
  }
})
const generateTable = () => {
  exportTable(
    [head, ...data.value],
    props.name,
    props.config
  )
}
const trigger = () => {
  fileRef.value.click()
}
const parseTable = (e,) => {
  readExcel(e.target.files[0], (arr) => {
    alert(JSON.stringify(arr))
  })
}
const guide = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '.guide-1', popover: { description: '下载表格文件' } },
      { element: '.guide-2', popover: { description: '解析本地表格并控制台输出' } },
      { element: '.guide-3', popover: { description: 'github本周热门项目' } }
    ],
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '完成'
  })
  driverObj.drive()
}

onBeforeMount(() => {
  loading.value = true
  let id = 0
  axios.get('/trending').then(res => {
    let doc = new DOMParser().parseFromString(res.data, 'text/html')
    doc.querySelectorAll('.Box-row').forEach(item => {
      const authorNode = item.querySelector('.lh-condensed span')
      const projectNode = authorNode.nextSibling
      const descNode = item.querySelector('p.color-fg-muted')
      const languageNode = item.querySelector('span[itemprop="programmingLanguage"]')
      const starsNode = item.querySelectorAll('.Link--muted')
      const str = `${authorNode?.textContent}${projectNode?.textContent}`.replace(/\s+/g, '')
      data.value.push({
        id: ++id,
        name: str,
        desc: descNode?.textContent?.trim(),
        language: languageNode?.textContent?.trim(),
        stars: starsNode[0].lastChild?.textContent?.replace(/\s+/g, ''),
        forks: starsNode[1].lastChild?.textContent?.replace(/\s+/g, '')
      })
      console.log(str)
    })
  }).finally(() => loading.value = false)
})
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="t-card">
      <!-- <el-button class="guide-1" type="primary" @click="router.push(`${route.path}/edit`)">
        添加数据
      </el-button> -->
      <el-button class="guide-1" type="primary" @click="generateTable">
        下载表格
      </el-button>
      <el-button class="guide-2" type="primary" @click="trigger">
        解析表格
      </el-button>
      <el-button class="guide-2" @click="guide">
        启用引导
      </el-button>
      <input ref="fileRef" type="file" hidden @change="parseTable" />
    </div>
    <div class="t-card mt-2 flex-1">
      <el-table v-loading="loading" max-height="650" size="large" :data="data" stripe>
        <el-table-column label="项目">
          <template #default="{ row }">
            <a :href="`https://github.com/${row.name}`" target="_blank"class="text-blue-500 hover:text-blue-800">{{ row.author }}{{ row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="{ row }">
            <el-tooltip v-if="row.desc" :content="row.desc" placement="bottom" effect="light">
              <span class="t-omit">{{ row.desc }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="语言">
          <template #default="{ row }">
            <el-tag>{{ row.language || 'markdown' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="stars" label="star数" />
        <el-table-column prop="forks" label="fork数" />
        <!-- <el-table-column fixed="right" width="200" label="操作">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" :icon="Edit" @click="router.push(`${route.path}/edit?id=${row.id}`)" />
              <el-button type="primary" :icon="View" @click="router.push(`${route.path}/info?id=${row.id}`)" />
              <el-button type="danger" :icon="Delete" />
            </el-button-group>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>