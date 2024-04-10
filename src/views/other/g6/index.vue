<script setup>
import { ref, onMounted } from 'vue'
import { Graph } from '@antv/g6'
import {
  lineRong,
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
  line9,
  line10,
  line17,
  line18,
  walk
} from './line'

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
    <div ref="subwayRef" class="h-[1500px]" style="zoom: 0.86"></div>
  </div>
</template>

