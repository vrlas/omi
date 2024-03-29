<script setup>
import domtoimage from 'dom-to-image'
import {
  Viewer,
  createWorldTerrainAsync,
  Cartesian3,
  Color,
  DistanceDisplayCondition,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Math as CMath,
  HeightReference,
  Ion,
  HorizontalOrigin,
  VerticalOrigin,
  GeoJsonDataSource,
  ImageMaterialProperty,
  EventHelper
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { cesiumOption } from '@/utils/map'
import { ref, onMounted } from 'vue'
import board from './board.vue'
import roadJSON from './road.json'

const lnglat = { lng: 104.341738, lat: 30.593555, pitch: -10, heading: 280, height: 1000 }
const position = ref({ ...lnglat })
const [mapRef, divGraphicRef] = [ref(null), ref(null)]
let viewer
const initMap = async () => {
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNjJjMzY0OS1hZGQxLTRiZmYtYWYwNS03NmIyM2MwMDgwZDAiLCJpZCI6MTIzMTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA4NDQ3Mjd9.OLTL_rs2gAi2R9zoztBHcJPDHnVl2Q7OZxRtZhoCeZE'
  viewer = new Viewer(mapRef.value, {...cesiumOption, terrainProvider: await createWorldTerrainAsync()})
  viewer.cesiumWidget.creditContainer.style.display = 'none' // 隐藏logo版权
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.debugShowFramesPerSecond = true // 显示帧率
  const helper = new EventHelper()
  helper.add(viewer.scene.globe.tileLoadProgressEvent, e => {
    if (e === 0) {
      setTimeout(() => {
        movePosition()
        flyTo()
        draw('polygon')
        addPopup()
        loadRoad()
      }, 2000)
      helper.removeAll()
    }
  })
}
const flyTo = () => {
  const { lng, lat, pitch, heading, height } = lnglat
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(lng, lat, height),
    orientation: {
      heading: CMath.toRadians(heading),
      pitch: CMath.toRadians(pitch)
    }
  })
}
// 画面
const draw = type => {
  if (type === 'polygon') {
    viewer.entities.add({
      polygon: {
        hierarchy: Cartesian3.fromDegreesArray([
          104.315891, 30.590263,
          104.318324, 30.598635,
          104.341738, 30.594555,
          104.338128, 30.586013
        ]),
        material: Color.GREEN.withAlpha(0.4)
      }
    })
  }
}
// 绘制广告牌
const addPopup = async () => {
  const url = await domtoimage.toPng(divGraphicRef.value)
  const pos = Cartesian3.fromDegrees(104.3298962, 30.592858)
  const point = {
    name: "点",
    position: pos,
    point: {
      show: true,
      color: Color.RED,
      pixelSize: 4,
      heightReference: HeightReference.CLAMP_TO_GROUND
    }
  }
  const graphic = {
    position: pos,
    billboard: {
      image: url,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      horizontalOrigin: HorizontalOrigin.LEFT,
      verticalOrigin: VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new DistanceDisplayCondition(0, 60000)
    }
  }
  viewer.entities.add(point)
  viewer.entities.add(graphic)
}

// 获取实时坐标
const movePosition = () => {
  const handler = new ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(movement => {
    const ellipsoid = viewer.scene.globe.ellipsoid
    const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid)
    if (cartesian) {
      const cartographic = ellipsoid.cartesianToCartographic(cartesian)
      const lng = +CMath.toDegrees(cartographic.longitude).toFixed(6)
      const lat = +CMath.toDegrees(cartographic.latitude).toFixed(6)
      const height = +CMath.toDegrees(viewer.camera.positionCartographic.height / 1000).toFixed(2)
      const pitch = +CMath.toDegrees(viewer.camera.pitch).toFixed(2)
      const heading = +CMath.toDegrees(viewer.camera.heading).toFixed(2)
      position.value = { lng, lat, pitch, heading, height }
    }
  }, ScreenSpaceEventType.MOUSE_MOVE)
}

// 加载道路
const loadRoad = () => {
  const promise = GeoJsonDataSource.load(roadJSON, {
    clampToGround: true
  })
  promise.then((datasource) => {
    viewer.dataSources.add(datasource)
    const entities = datasource.entities.values
    let material = new ImageMaterialProperty({
      color: Color.SKYBLUE.withAlpha(0.5),
      image: '/house.jpg'
    })
    entities.length = 400
    entities.forEach((entity, i) => {
      entity.polygon.extrudedHeight = Math.round(Math.random() * 800) + 400
      entity.polygon.outline = false
      entity.polygon.material = material
    })
  })
}

onMounted(initMap)
</script>

<template>
  <div class="w-full h-full overflow-hidden relative" ref="mapRef">
    <div class="absolute -z-10 t-divGraphic" ref="divGraphicRef">
      <div class="absolute top-2 left-[128px] text-white font-bold text-sm">1号观景点</div>
      <div class="absolute top-8 left-12 w-[140px] h-[120px] text-white text text-sm flex flex-col justify-evenly">
        <div>经度: <el-tag class="ml-2" type="primary" size="small">104.325891</el-tag></div>
        <div>纬度: <el-tag class="ml-2" type="primary" size="small">30.594535</el-tag></div>
        <div>高程: <el-tag class="ml-2" type="primary" size="small">42.84m</el-tag></div>
      </div>
    </div>
    <board :position="position" />
  </div>
</template>