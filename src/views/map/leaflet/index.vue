<script setup>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { ref, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import 'leaflet.chinatmsproviders'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Station from '@/assets/imgs/station.png'
import { antPath } from 'leaflet-ant-path'
import { parseRouteToPath } from '@/utils/map'

let AMap, map, placeSearch, path

const station = ref({
  start: '',
  end: '',
  sLngLat: [],
  eLngLat: []
})
const type = ref('')
const list = ref([])

// 添加公交站点
const addStations = () => {
  const markers = L.markerClusterGroup()
  AMap.plugin(['AMap.StationSearch'], function() {
    const station = new AMap.StationSearch({
      pageIndex: 1,
      pageSize: 100,
      city: '028'
    })
    station.search('地铁站', (status, result) => {
      if (status === 'complete') {
        const { stationInfo } = result
        stationInfo.forEach(station => {
          const { name, location: { lng, lat } } = station
          const marker = L.marker(new L.LatLng(lat, lng), {
            icon: L.icon({
              iconUrl: Station,
              iconSize: [40, 40]
            })
          })
          marker.bindPopup(name).openPopup()
          markers.addLayer(marker)
        })
        map.addLayer(markers)
      }
    })
  })
}

// 添加缩放监听
const addListener = () => {
  map.on('zoomend', e => {
    const scale = e.target.getZoom()
    console.log(scale)
  })
}

// 添加切片图层
const addLayer = () => {
  L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
  }).addTo(map)
}

const initMap = async () => {
  AMap = await AMapLoader.load({
    key: '9bbc890a65e9963640417b3a609d7dbf',
    version: '2.0',
    plugins: ['AMap.StationSearch', 'AMap.PlaceSearch', 'AMap.Driving']
  })
  map = L.map('leaflet-map', {
    center: [30.6574, 104.0658],
    zoom: 13
  })
  placeSearch = new AMap.PlaceSearch({city: '028'})
  addStations()
  addListener()
  addLayer()
}

const search = t => {
  placeSearch?.search(station.value[t], function (status, result) {
    if (status === 'complete') {
      const pois = result?.poiList?.pois
      list.value = pois
      type.value = t
    }
  })
}

const sure = ({ name, location }) => {
  station.value[type.value] = name
  station.value[type.value === 'start' ? 'sLngLat' : 'eLngLat'] = [location?.lng, location?.lat]
  // 隐藏选项
  type.value = ''
  if (station.value['sLngLat'].length && station.value['eLngLat'].length) {
    path && map.removeLayer(path)
    AMap.plugin('AMap.Driving', () => {
      const driving = new AMap.Driving({
        policy: AMap.DrivingPolicy.LEAST_TIME
      })
      driving.search(station.value['sLngLat'], station.value['eLngLat'], (status, result) => {
        if (status === 'complete') {
          path = antPath(parseRouteToPath(result.routes[0]), {
            delay: 400,
            dashArray: [10, 20],
            weight: 5,
            color: '#f00',
            pulseColor: '#fff',
            paused: false,
            reverse: false,
            hardwareAccelerated: true
          })
          map.addLayer(path)
          map.fitBounds(path.getBounds())
        }
      })
    })
  }
}

onMounted(initMap)
</script>

<template>
  <div class="t-card h-full">
    <div class="flex bg-white shadow-lg w-[610px] absolute right-4 top-4 z-[999]">
      <input v-model="station.start" class="input" placeholder="起点: Enter查询目标点" @keyup.enter="search('start')" />
      <div class=" bg-green-500 text-white px-2 text-lg t-center">
        /
      </div>
      <input v-model="station.end" class="input -translate-x-1" placeholder="终点: Enter查询目标点" @keyup.enter="search('end')" />
      <div v-if="type" :class="type === 'start' ? 'left-0' : 'right-0'" class="absolute mt-[40px] py-1 overflow-y-scroll w-[294px] h-[200px] rounded-b text-sm bg-white pl-2 pt-1">
        <div v-for="item, i in list" :key="i" class="p-1 flex justify-between cursor-pointer text-slate-600 hover:bg-green-400 w-full hover:text-white" @click="() => sure(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div id="leaflet-map" className="t-card w-full h-full t-gray rounded"></div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  @apply py-2 indent-4 bg-transparent text-sm w-[300px];
}
:deep(.leaflet-layer) {
  filter: hue-rotate(180deg);
}
:deep(.leaflet-popup-content-wrapper) {
  border: 4px dashed rgba(0,255,0,.4);
}
:deep(.leaflet-control-zoom-in) {
  @apply bg-green-500 opacity-80 text-white border-none hover:opacity-100 hover:bg-green-500;
}
:deep(.leaflet-control-zoom-out) {
  @apply bg-blue-500 opacity-80 text-white border-none hover:opacity-100 hover:bg-blue-500;
}
</style>