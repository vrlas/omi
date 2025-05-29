const cesiumToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMzI3MmJkYy00ZWViLTRmODAtYjY4NS1lNzgxNzYwOTZlNWUiLCJpZCI6ODc4OTEsImlhdCI6MTY0ODc3NzIwNH0.pS37i26Iuwri5pjc1GLR41xyRno20JBcWSiXs-p0bK8'

// cesium配置项
const cesiumOption = {
  geocoder: false, //搜索框
  homeButton: false, //home按钮
  sceneModePicker: false, //3d/2d 模式切换按钮
  baseLayerPicker: false, //图层选择按钮
  navigationHelpButton: false, //右上角的帮助按钮
  animation: false, //左下角的动画控件的显示
  shouldAnimate: false, //控制模型动画
  timeline: false, //底部的时间轴
  fullscreenButton: false, //右下角的全屏按钮
  infoBox: true, //信息面板
  selectionIndicator: false // 取消绿色指示器
}

/**
 * 路径解析
 * @param route result.routes[0]
 */
const parseRouteToPath = route => {
  let path = []
  for (let i = 0, l = route.steps.length; i < l; i++) {
    let step = route.steps[i]
    for (let j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j])
    }
  }
  return path
}

export {
  cesiumToken,
  cesiumOption,
  parseRouteToPath
}
