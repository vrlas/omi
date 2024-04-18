export const menus = [
  {
    name: 'wps',
    link: 'wps',
    children: [
      { name: 'excel', link: 'wps/excel', code: '/wps/excel/index.vue' }
    ]
  },
  {
    name: '地图',
    link: 'map',
    children: [
      { name: 'cesium', link: 'map/cesium', code: '/map/cesium/index.vue' },
      { name: 'leaflet', link: 'map/leaflet', code: '/map/leaflet/index.vue' }
    ]
  },
  {
    name: '其他',
    link: 'other',
    children: [
      { name: '移动端', link: 'other/mobile', code: '/other/other/mobile.vue' },
      { name: '拓扑图', link: 'other/g6', code: '/other/g6/index.vue' },
      { name: 'cool', link: 'other/cool', code: '/other/cool/index.vue' }
    ]
  }
]