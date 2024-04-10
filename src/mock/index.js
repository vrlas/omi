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
      { name: '拓扑图', link: 'other/g6', code: '/other/g6/index.vue' },
      { name: 'cool', link: 'other/cool', code: '/other/cool/index.vue' }
    ]
  }
]

export const mockList = [
  '图片抠图细节实现',
  'm3u8视频播放器',
  '地图加载阻塞页面渲染'
]