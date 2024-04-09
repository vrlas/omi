<script setup>
import { ref, onMounted } from 'vue'
import { Graph } from '@antv/g6'
import lineRong from '@/mock/linerong'
import line1 from '@/mock/line1'
import line2 from '@/mock/line2'
import line3 from '@/mock/line3'
import line4 from '@/mock/line4'
import line5 from '@/mock/line5'
import line6 from '@/mock/line6'
import line7 from '@/mock/line7'
import line8 from '@/mock/line8'
import line9 from '@/mock/line9'
import line10 from '@/mock/line10'
import line17 from '@/mock/line17'
import line18 from '@/mock/line18'
import walk from '@/mock/walk'

const subwayRef = ref(null)
const render = () => {
  const graph = new Graph({
    container: subwayRef.value,
    linkCenter: true,
    defaultNode: {
      labelCfg: {
        position: 'top',
        offset: 4,
        style: {
          // fill: '#fff',
          fontSize: 11
        }
      },
      size: 10,
      style: {
        stroke: 'transparent'
      }
    },
    defaultEdge: {
      style: {
        lineWidth: 4
      }
    }
  })
  graph.data({
    nodes: [...lineRong.nodes, ...line1.nodes, ...line2.nodes, ...line3.nodes, ...line4.nodes, ...line5.nodes, ...line6.nodes, ...line7.nodes, ...line8.nodes, ...line9.nodes, ...line10.nodes, ...line17.nodes, ...line18.nodes],
    edges: [...lineRong.edges, ...line1.edges, ...line2.edges, ...line3.edges, ...line4.edges, ...line5.edges, ...line6.edges, ...line7.edges, ...line8.edges, ...line9.edges, ...line10.edges, ...line17.edges, ...line18.edges, ...walk.edges]
  })
  graph.render()
}

onMounted(render)
</script>

<template>
  <div class="bg-white rounded h-full overflow-scroll">
    <div class="h-[1500px]" ref="subwayRef" style="zoom: 0.86"></div>
  </div>
</template>

