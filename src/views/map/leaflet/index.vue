<script setup>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { antPath } from 'leaflet-ant-path'
import { ref, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import 'leaflet.chinatmsproviders'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

let AMap, map, placeSearch

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
        stationInfo.forEach((station, i) => {
          const { name, location: { lng, lat } } = station
          const marker = L.marker(new L.LatLng(lat, lng), {
            icon: L.icon({
              iconUrl: '/station.png',
              iconSize: [32, 41]
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
  })
}

// 添加切片图层
const addLayer = () => {
  L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
  }).addTo(map)
}

// const addCurrent = () => {
//   navigator.geolocation?.getCurrentPosition(position => {
//     const { coords: { latitude: lat, longitude: lng } } = position
//     L.marker(new L.LatLng(lat, lng), {
//       icon: L.divIcon({
//         html: '<div class="wave-circle hover-circle"><div class="pulse"></div></div>',
//         iconSize: [96, 96],
//         className: 'marker-wrapper'
//       })
//     }).addTo(map)
//   })
// }

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
  // addCurrent()
}

onMounted(initMap)
</script>

<template>
  <div id="leaflet-map" className="t-card w-full h-full t-gray rounded"></div>
</template>